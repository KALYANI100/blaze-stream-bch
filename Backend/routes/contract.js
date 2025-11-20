// routes/withdraw.js - UPDATED (NO PRIVATE KEY NEEDED)
import express from "express";
import http from 'http';
import { Buffer } from 'buffer';

class BCHRPC {
  constructor(port = 18443, username = 'bchuser', password = 'bchpass') {
    this.port = port;
    this.auth = Buffer.from(`${username}:${password}`).toString('base64');
  }

  async call(method, params = []) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        jsonrpc: '1.0',
        id: 'bch_api',
        method,
        params,
      });

      const options = {
        hostname: '127.0.0.1',
        port: this.port,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'Authorization': `Basic ${this.auth}`,
        },
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            if (result.error) reject(new Error(result.error.message));
            else resolve(result.result);
          } catch (err) {
            reject(new Error(`JSON parse error: ${err.message}`));
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(data);
      req.end();
    });
  }
}

const router = express.Router();
const rpc = new BCHRPC();

// POST /withdraw - SIMPLIFIED (NO PRIVATE KEY)
router.post("/", async (req, res) => {
  try {
    const { contractAddress, payoutAddress, redeemScriptHex, creatorAddress } = req.body;
console.log( contractAddress, payoutAddress, redeemScriptHex, creatorAddress )
    // ✅ PRIVATE KEY IS NEEDED FOR SIGNING!
    if (!contractAddress || !payoutAddress || !redeemScriptHex || !creatorAddress) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("🚀 Starting contract withdrawal...");
    console.log("📝 Contract:", contractAddress);
    console.log("🎯 Payout to:", payoutAddress);
    console.log("👤 Creator:", creatorAddress);

    // 1️⃣ Import contract address for UTXO discovery
    await rpc.call("importaddress", [contractAddress, "contract-address", false]);
    console.log("✅ Contract address imported");

    // Wait for wallet to index
    await new Promise((r) => setTimeout(r, 2000));

    // 2️⃣ Fetch UTXOs
    const utxos = await rpc.call("listunspent", [0, 9999999, [contractAddress]]);
    console.log("📦 Found UTXOs:", utxos.length);

    if (!utxos.length) {
      return res.status(400).json({ error: "No funds in contract" });
    }

    // 3️⃣ Calculate amounts
    const totalSats = utxos.reduce((sum, u) => sum + Math.round(u.amount * 1e8), 0);
    const fee = 5000;
    const sendSats = totalSats - fee;
    
    if (sendSats < 546) {
      return res.status(400).json({ error: "Not enough funds after fee" });
    }

    console.log(`💰 Total: ${totalSats} sats, Sending: ${sendSats} sats`);

    // 4️⃣ Build transaction
    const inputs = utxos.map((u) => ({ txid: u.txid, vout: u.vout }));
    const outputs = { [payoutAddress]: sendSats / 1e8 };

    const rawTx = await rpc.call("createrawtransaction", [inputs, outputs]);
    console.log("📄 Raw transaction created");

    // 5️⃣ Sign transaction - FIXED: Need private key!
    console.log("🔐 Signing transaction with creator's key...");
    
    // Get the private key for the creator address
    const privateKey = await rpc.call("dumpprivkey", [creatorAddress]);
    console.log("Private Key",privateKey);
    const signResult = await rpc.call("signrawtransactionwithkey", [
      rawTx,
      [privateKey], // ✅ PRIVATE KEY IS REQUIRED!
      utxos.map(utxo => ({
        txid: utxo.txid,
        vout: utxo.vout,
        scriptPubKey: utxo.scriptPubKey,
        redeemScript: redeemScriptHex,
        amount: utxo.amount,
      }))
    ]);

    console.log("✅ Signing complete:", signResult.complete);

    if (!signResult.complete) {
      console.error("❌ Signing failed:", signResult.errors);
      return res.status(500).json({ 
        error: "Signing failed", 
        details: signResult.errors 
      });
    }

    // 6️⃣ Broadcast transaction
    console.log("📡 Broadcasting...");
    const txid = await rpc.call("sendrawtransaction", [signResult.hex]);
    
    console.log("🎉 Transaction successful! TXID:", txid);

    res.json({ 
      success: true, 
      txid, 
      withdrawnSats: sendSats,
      fee: fee,
      totalSats: totalSats
    });

  } catch (err) {
    console.error("❌ Withdraw error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;