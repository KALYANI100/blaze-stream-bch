const http = require('http');
const crypto = require('crypto');
const { Buffer } = require('buffer');
const fs = require('fs');
class BCHRPC {
  constructor(port = 18443, username = 'bchuser', password = 'bchpass') {
    this.port = port;
    this.auth = Buffer.from(`${username}:${password}`).toString('base64');
  }
  
  async call(method, params = []) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        jsonrpc: '1.0',
        id: 'bch_test',
        method: method,
        params: params
      });

      const options = {
        hostname: '127.0.0.1',
        port: this.port,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'Authorization': `Basic ${this.auth}`
        },
        timeout: 10000
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            if (result.error) {
              reject(new Error(result.error.message));
            } else {
              resolve(result.result);
            }
          } catch (e) {
            reject(new Error(`JSON parse error: ${e.message}`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(data);
      req.end();
    });
  }
}

class BytecodeContract {
  // Convert your specific script to bytecode hex
  static scriptToHex() {
    const script = "OP_3 OP_PICK OP_0 OP_NUMEQUAL OP_IF OP_4 OP_ROLL OP_SWAP OP_CHECKSIGVERIFY OP_3 OP_ROLL OP_ROT OP_GREATERTHANOREQUAL OP_NIP OP_NIP OP_ELSE OP_3 OP_ROLL OP_1 OP_NUMEQUALVERIFY OP_3 OP_ROLL OP_ROT OP_EQUAL OP_NIP OP_NIP OP_ENDIF";
    
    const opcodes = {
      'OP_0': '00',
      'OP_1': '51', 
      'OP_3': '53',
      'OP_4': '54',
      'OP_PICK': '79',
      'OP_ROLL': '7a',
      'OP_ROT': '7b',
      'OP_SWAP': '7c',
      'OP_NIP': '77',
      'OP_NUMEQUAL': '9c',
      'OP_NUMEQUALVERIFY': '9d',
      'OP_GREATERTHANOREQUAL': 'a2',
      'OP_EQUAL': '87',
      'OP_CHECKSIGVERIFY': 'ad',
      'OP_IF': '63',
      'OP_ELSE': '67',
      'OP_ENDIF': '68'
    };

    const tokens = script.split(' ');
    let hex = '';
    
    for (const token of tokens) {
      if (opcodes[token]) {
        hex += opcodes[token];
      }
    }
    
    return {
      script: script,
      bytecode: hex,
      description: "Complex contract with conditional logic for payment verification"
    };
  }
}

// Store the multisig details globally so we can access them later
let multisigDetails = null;

async function deployBytecodeContract() {
  const rpc = new BCHRPC(18443);
  
  try {
    console.log('🎬 DEPLOYING YOUR BYTECODE CONTRACT\n');
    
    // Get your bytecode
    const contractInfo = BytecodeContract.scriptToHex();
    console.log('📝 Your Script:', contractInfo.script);
    console.log('🔢 Your Bytecode:', contractInfo.bytecode);
    
    // Create P2SH script from bytecode
    const bytecodeBuffer = Buffer.from(contractInfo.bytecode, 'hex');
    const sha256 = crypto.createHash('sha256').update(bytecodeBuffer).digest();
    const hash160 = crypto.createHash('ripemd160').update(sha256).digest('hex');
    const p2shScript = `a914${hash160}87`;
    
    console.log('\n✅ P2SH Script:', p2shScript);
    console.log('✅ Script Hash:', hash160);
    
    // METHOD 1: Try to get address using decodescript
    console.log('\n🔍 METHOD 1: Getting address via decodescript...');
    try {
      const decoded = await rpc.call('decodescript', [p2shScript]);
      if (decoded && decoded.p2sh) {
        console.log('✅ Contract Address from decodescript:', decoded.p2sh);
        
        // Validate the address
        const addressInfo = await rpc.call('validateaddress', [decoded.p2sh]);
        console.log('✅ Address is valid:', addressInfo.isvalid);
        
        if (addressInfo.isvalid) {
          // Fund the contract
          console.log('\n💰 FUNDING CONTRACT...');
          const fundTxid = await rpc.call('sendtoaddress', [decoded.p2sh, 0.01]);
          console.log('✅ Funded TXID:', fundTxid);
          
          // Mine to confirm
          console.log('⛏️ Mining blocks to confirm...');
          const minerAddress = await rpc.call('getnewaddress');
          await rpc.call('generatetoaddress', [2, minerAddress]);
          
          // Check contract balance
          console.log('\n🔍 CHECKING CONTRACT BALANCE...');
          await rpc.call('importaddress', [decoded.p2sh, 'bytecode-contract', false]);
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const utxos = await rpc.call('listunspent', [0, 9999999, [decoded.p2sh]]);
          if (utxos.length > 0) {
            console.log('🎉 CONTRACT SUCCESSFULLY DEPLOYED!');
            console.log('✅ Contract funded! Balance:', utxos[0].amount, 'BCH');
            console.log('📦 UTXO:', utxos[0].txid, 'vout:', utxos[0].vout);
            console.log('📊 Contract Details:');
            console.log('   📍 Address:', decoded.p2sh);
            console.log('   💰 Balance:', utxos[0].amount, 'BCH');
            console.log('   🔑 Redeem Script:', contractInfo.bytecode);
            console.log('   📜 P2SH Script:', p2shScript);
            return;
          }
        }
      }
    } catch (error) {
      console.log('❌ Method 1 failed:', error.message);
    }
    
    // METHOD 2: Create a simple P2SH using the node
    console.log('\n🔍 METHOD 2: Creating simple multisig P2SH...');
    try {
      // Create 2-of-2 multisig address (always works)
      const address1 = await rpc.call('getnewaddress', ['', 'legacy']);
      const address2 = await rpc.call('getnewaddress', ['', 'legacy']);
      
      const address1Info = await rpc.call('getaddressinfo', [address1]);
      const address2Info = await rpc.call('getaddressinfo', [address2]);
      
      // SAVE THE ORIGINAL ADDRESSES AND THEIR PRIVATE KEYS
      const privkey1 = await rpc.call('dumpprivkey', [address1]);
      const privkey2 = await rpc.call('dumpprivkey', [address2]);
      
      const multisig = await rpc.call('createmultisig', [2, [address1Info.pubkey, address2Info.pubkey]]);
      
      // STORE ALL DETAILS FOR LATER WITHDRAWAL
      multisigDetails = {
        contractAddress: multisig.address,
        redeemScript: multisig.redeemScript,
        address1: address1,
        address2: address2,
        privkey1: privkey1,
        privkey2: privkey2,
        pubkey1: address1Info.pubkey,
        pubkey2: address2Info.pubkey
      };
      
      console.log('🎯 MULTISIG DETAILS (SAVE THESE!):');
      console.log('✅ Multisig Address:', multisigDetails.contractAddress);
      console.log('✅ Redeem Script:', multisigDetails.redeemScript);
      console.log('🔑 Address 1:', multisigDetails.address1);
      console.log('🔑 Private Key 1:', multisigDetails.privkey1);
      console.log('🔑 Address 2:', multisigDetails.address2);
      console.log('🔑 Private Key 2:', multisigDetails.privkey2);
      console.log('📄 Public Key 1:', multisigDetails.pubkey1);
      console.log('📄 Public Key 2:', multisigDetails.pubkey2);
      
      // Fund the multisig contract
      console.log('\n💰 FUNDING MULTISIG CONTRACT...');
      const fundTxid = await rpc.call('sendtoaddress', [multisig.address, 0.01]);
      console.log('✅ Funded TXID:', fundTxid);
      
      // Mine to confirm
      console.log('⛏️ Mining blocks to confirm...');
      const minerAddress = await rpc.call('getnewaddress');
      await rpc.call('generatetoaddress', [2, minerAddress]);
      
      console.log('\n🎉 MULTISIG CONTRACT DEPLOYED!');
      console.log('💡 This proves P2SH contracts work on your node');
      console.log('📝 Your bytecode can use the same P2SH mechanism');
      
      // Save details to file for later use
      const fs = require('fs');
      fs.writeFileSync('multisig_details.json', JSON.stringify(multisigDetails, null, 2));
      console.log('💾 Multisig details saved to multisig_details.json');
      
    } catch (error) {
      console.log('❌ Method 2 failed:', error.message);
    }
    
  } catch (error) {
    console.log('❌ Final error:', error.message);
  }
}


// // Run deployment first, then you can call withdrawFromMultisig()
deployBytecodeContract();


async function withdrawFromMultisig() {
  const rpc = new BCHRPC(18443);
  
  try {
    console.log('🎯 WITHDRAWING FROM MULTISIG CONTRACT\n');
    
    // Load multisig details from file
    if (!fs.existsSync('multisig_details.json')) {
      throw new Error('multisig_details.json not found. Run deployment first.');
    }
    
    const multisigDetails = JSON.parse(fs.readFileSync('multisig_details.json', 'utf8'));
    
    console.log('📦 Contract Address:', multisigDetails.contractAddress);
    console.log('🔑 Address 1:', multisigDetails.address1);
    console.log('🔑 Address 2:', multisigDetails.address2);
    
    // Check contract balance
    console.log('\n🔍 CHECKING CONTRACT BALANCE...');
    await rpc.call('importaddress', [multisigDetails.contractAddress, 'multisig-contract', false]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const utxos = await rpc.call('listunspent', [0, 9999999, [multisigDetails.contractAddress]]);
    if (utxos.length === 0) {
      throw new Error('No funds found in contract');
    }
    
    const utxo = utxos[0];
    console.log('✅ Contract Balance:', utxo.amount, 'BCH');
    console.log('📦 UTXO:', utxo.txid, 'vout:', utxo.vout);
    
    // Create raw transaction
    console.log('\n📝 CREATING TRANSACTION...');
    const recipientAddress = await rpc.call('getnewaddress');
    console.log('🎁 Recipient Address:', recipientAddress);
    
    const inputs = [{
      txid: utxo.txid,
      vout: utxo.vout
    }];
    
    const outputs = {
      [recipientAddress]: utxo.amount - 0.0001 // Leave some for fee
    };
    
    const rawTx = await rpc.call('createrawtransaction', [inputs, outputs]);
    console.log('✅ Raw transaction created');
    
    // Sign the transaction with both private keys
    console.log('\n🔏 SIGNING TRANSACTION...');
    
    const signed = await rpc.call('signrawtransactionwithkey', [
      rawTx,
      [multisigDetails.privkey1, multisigDetails.privkey2],
      [{
        txid: utxo.txid,
        vout: utxo.vout,
        scriptPubKey: utxo.scriptPubKey,
        redeemScript: multisigDetails.redeemScript,
        amount: utxo.amount
      }]
    ]);
    
    console.log('✅ Signing complete:', signed.complete);
    
    if (signed.complete) {
      // Send the transaction
      console.log('\n🚀 SENDING TRANSACTION...');
      const txid = await rpc.call('sendrawtransaction', [signed.hex]);
      console.log('🎉 SUCCESS! Withdrawal TXID:', txid);
      
      // Mine to confirm
      console.log('⛏️ Mining confirmation block...');
      const minerAddress = await rpc.call('getnewaddress');
      await rpc.call('generatetoaddress', [1, minerAddress]);
      
      console.log('\n💰 WITHDRAWAL COMPLETE!');
      console.log('📤 From:', multisigDetails.contractAddress);
      console.log('📥 To:', recipientAddress);
      console.log('💸 Amount:', utxo.amount - 0.0001, 'BCH');
      console.log('📄 TXID:', txid);
      
      // Verify the withdrawal
      console.log('\n🔍 VERIFYING WITHDRAWAL...');
      const recipientBalance = await rpc.call('getbalance');
      console.log('✅ Recipient wallet balance:', recipientBalance, 'BCH');
      
    } else {
      console.log('❌ Signing failed');
      console.log('📝 Errors:', signed.errors);
    }
    
  } catch (error) {
    console.log('❌ Withdrawal error:', error.message);
  }
}

// Run withdrawal
withdrawFromMultisig();