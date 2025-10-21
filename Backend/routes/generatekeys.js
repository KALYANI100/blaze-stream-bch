// // routes/generateWallet.js
// import express from 'express';
// import http from 'http';
// import { Buffer } from 'buffer';

// const router = express.Router();

// // Simple BCH RPC client
// class BCHRPC {
//   constructor(port = 18443, username = 'bchuser', password = 'bchpass') {
//     this.port = port;
//     this.auth = Buffer.from(`${username}:${password}`).toString('base64');
//   }

//   async call(method, params = []) {
//     return new Promise((resolve, reject) => {
//       const data = JSON.stringify({
//         jsonrpc: '1.0',
//         id: 'bch_api',
//         method,
//         params,
//       });

//       const options = {
//         hostname: '127.0.0.1',
//         port: this.port,
//         path: '/',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Content-Length': Buffer.byteLength(data),
//           'Authorization': `Basic ${this.auth}`,
//         },
//       };

//       const req = http.request(options, (res) => {
//         let responseData = '';
//         res.on('data', (chunk) => (responseData += chunk));
//         res.on('end', () => {
//           try {
//             const result = JSON.parse(responseData);
//             if (result.error) reject(new Error(result.error.message));
//             else resolve(result.result);
//           } catch (err) {
//             reject(new Error(`JSON parse error: ${err.message}`));
//           }
//         });
//       });

//       req.on('error', (err) => reject(err));
//       req.write(data);
//       req.end();
//     });
//   }
// }

// // Route: Generate wallet
// router.post('/generate-wallet', async (req, res) => {
//   const rpc = new BCHRPC(18443, 'bchuser', 'bchpass'); // Adjust credentials
//   try {
//     // Unlock wallet for 60s if encrypted (optional)
//     // await rpc.call('walletpassphrase', ['yourWalletPassword', 60]);

//     // 1️⃣ Create new address
//     const address = await rpc.call('getnewaddress', ['', 'legacy']);

//     // 2️⃣ Get address info (public key)
//     const info = await rpc.call('getaddressinfo', [address]);

//     // 3️⃣ Fetch private key
//     const privKey = await rpc.call('dumpprivkey', [address]);

//     // 4️⃣ Send all data
//     res.json({
//       success: true,
//       wallet: {
//         address: address,
//         pubKey: info.pubkey,
//         privKey: privKey,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// export default router;


// routes/generateWallet.js
import express from 'express';
import http from 'http';
import { Buffer } from 'buffer';

const router = express.Router();

// Simple BCH RPC client
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

// Route: Generate wallet
router.post('/generate-wallet', async (req, res) => {
  const rpc = new BCHRPC(18443, 'bchuser', 'bchpass');
  try {
    // 1️⃣ Create new address
    const address = await rpc.call('getnewaddress', ['', 'legacy']);

    // 2️⃣ Get address info (public key)
    const info = await rpc.call('getaddressinfo', [address]);

    // 3️⃣ Get private key in WIF format
    const wif = await rpc.call('dumpprivkey', [address]);

    // 4️⃣ Convert WIF to 64-char hex private key
    // Use bitcoincore-lib or similar for conversion, or use RPC
    const hexPrivateKey = await convertWifToHex(rpc, wif);

    // 5️⃣ Send all data
    res.json({
      success: true,
      wallet: {
        address: address,
        pubKey: info.pubkey,
        wif: wif,
        privKeyHex: hexPrivateKey, // 64-character hex
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper function to convert WIF to hex using RPC
async function convertWifToHex(rpc, wif) {
  try {
    // Method 1: Use dumpwallet and parse (if you have file access)
    // Method 2: Use signmessage and recover (complex)
    // Method 3: Use a JavaScript library (recommended)
    
    // Since we can't easily convert WIF to hex with core RPC alone,
    // we'll use a simple JavaScript implementation
    return wifToHex(wif);
  } catch (error) {
    console.error('Failed to convert WIF to hex:', error);
    return null;
  }
}

// Simple WIF to Hex conversion (for mainnet/testnet/regtest)
 async function wifToHex(wif) {
  // WIF structure: [Version Byte] + [32-byte private key] + [Compression Flag] + [Checksum]
  
  // Remove compression flag and checksum, then decode from base58
     const { default: bs58 } = await import('bs58');

  
  try {
    const decoded = bs58.decode(wif);
    
    // For compressed WIF: version byte (1) + private key (32) + compression (1) + checksum (4)
    // For uncompressed WIF: version byte (1) + private key (32) + checksum (4)
    let privateKeyBytes;
    
    if (decoded.length === 38) { // Compressed WIF
      privateKeyBytes = decoded.slice(1, 33); // Skip version byte, take 32 bytes
    } else if (decoded.length === 37) { // Uncompressed WIF  
      privateKeyBytes = decoded.slice(1, 33); // Skip version byte, take 32 bytes
    } else {
      throw new Error('Invalid WIF format');
    }
    
    // Convert to hex (64 characters)
    return Buffer.from(privateKeyBytes).toString('hex');
  } catch (error) {
    throw new Error(`WIF to hex conversion failed: ${error.message}`);
  }
}

export default router;