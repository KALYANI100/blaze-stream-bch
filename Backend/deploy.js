// const http = require('http');
// const crypto = require('crypto');
// const { Buffer } = require('buffer');
// const fs = require('fs');

// // Load PayPerView contract from JSON
// const PAY_PER_VIEW_CONTRACT = JSON.parse(fs.readFileSync('./PayPerViewToken.json', 'utf8'));

// class BCHRPC {
//   constructor(port = 18443, username = 'bchuser', password = 'bchpass') {
//     this.port = port;
//     this.auth = Buffer.from(`${username}:${password}`).toString('base64');
//   }
  
//   async call(method, params = []) {
//     return new Promise((resolve, reject) => {
//       const data = JSON.stringify({
//         jsonrpc: '1.0',
//         id: 'bch_test',
//         method: method,
//         params: params
//       });

//       const options = {
//         hostname: '127.0.0.1',
//         port: this.port,
//         path: '/',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Content-Length': Buffer.byteLength(data),
//           'Authorization': `Basic ${this.auth}`
//         },
//         timeout: 10000
//       };

//       const req = http.request(options, (res) => {
//         let responseData = '';
        
//         res.on('data', (chunk) => {
//           responseData += chunk;
//         });
        
//         res.on('end', () => {
//           try {
//             const result = JSON.parse(responseData);
//             if (result.error) {
//               reject(new Error(result.error.message));
//             } else {
//               resolve(result.result);
//             }
//           } catch (e) {
//             reject(new Error(`JSON parse error: ${e.message}`));
//           }
//         });
//       });

//       req.on('timeout', () => {
//         req.destroy();
//         reject(new Error('Request timeout'));
//       });

//       req.on('error', (err) => {
//         reject(err);
//       });

//       req.write(data);
//       req.end();
//     });
//   }
// }

// class BlazeTubePayPerView {
  
//   /**
//    * Create PayPerView contract using JSON definition
//    */
//   static async createPayPerViewContract(rpc, videoPrice, creatorAddress) {
//     const creatorInfo = await rpc.call('getaddressinfo', [creatorAddress]);
    
//     // Convert price to satoshis
//     const priceSatoshis = Math.round(videoPrice * 100000000);
    
//     console.log(`📄 Contract: ${PAY_PER_VIEW_CONTRACT.contractName}`);
//     console.log(`💰 Price: ${videoPrice} BCH (${priceSatoshis} satoshis)`);
//     console.log(`👨‍🎨 Creator: ${creatorAddress}`);
//     console.log(`🔑 PubKey: ${creatorInfo.pubkey.substring(0, 20)}...`);
    
//     return {
//       contract: PAY_PER_VIEW_CONTRACT,
//       parameters: {
//         creatorPubkey: creatorInfo.pubkey,
//         price: priceSatoshis,
//         creatorPkh: this.getPubKeyHash(creatorInfo.pubkey)
//       },
//       bytecode: PAY_PER_VIEW_CONTRACT.bytecode
//     };
//   }

//   /**
//    * Extract public key hash from public key (for P2PKH)
//    */
//   static getPubKeyHash(pubkey) {
//     const pubKeyBuffer = Buffer.from(pubkey, 'hex');
//     const hash = crypto.createHash('sha256').update(pubKeyBuffer).digest();
//     const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
//     return ripemd160;
//   }

//   /**
//    * Compile contract to get address
//    */
//   static async compileContract(rpc, contractDefinition) {
//     try {
//       // Use the bytecode from JSON and decode to get address
//       const decodeResult = await rpc.call('decodescript', [contractDefinition.bytecode]);
//       return {
//         address: decodeResult.p2sh,
//         script: contractDefinition.bytecode,
//         contract: contractDefinition.contract
//       };
//     } catch (error) {
//       console.log(`⚠️  Compilation warning: ${error.message}`);
//       // Fallback to standard P2PKH
//       const pkh = this.getPubKeyHash(contractDefinition.parameters.creatorPubkey);
//       const fallbackScript = `76a914${pkh}88ac`;
//       const decodeResult = await rpc.call('decodescript', [fallbackScript]);
//       return {
//         address: decodeResult.p2sh,
//         script: fallbackScript,
//         contract: contractDefinition.contract,
//         isFallback: true
//       };
//     }
//   }

//   /**
//    * VIDEO REGISTRATION - Generate unique video hash
//    */
//   static registerVideo(videoID, videoUrl, creatorPubKey) {
//     const hashInput = `${videoID}|${videoUrl}|${creatorPubKey}`;
//     const videoHash = crypto.createHash('sha256').update(hashInput).digest('hex');

//     return {
//       videoHash,
//       creatorPubKey,
//       txHash: null,
//       blockNumber: null
//     };
//   }
// }

// async function deployPayPerViewContract() {
//   const rpc = new BCHRPC(18443);
  
//   try {
//     console.log('🎬 DEPLOYING PAY-PER-VIEW CONTRACT\n');
    
//     // Get blockchain info
//     const info = await rpc.call('getblockchaininfo');
//     console.log(`📦 Current block: ${info.blocks}`);
    
//     // Create creator wallet
//     const creatorAddress = await rpc.call('getnewaddress', ['', 'legacy']);
//     console.log(`👨‍🎨 Creator Address: ${creatorAddress}\n`);
    
//     // 1. PAY-PER-VIEW CONTRACT
//     console.log('1. 🎥 PAY-PER-VIEW CONTRACT');
//     const ppvContract = await BlazeTubePayPerView.createPayPerViewContract(rpc, 0.05, creatorAddress);
//     const ppvCompiled = await BlazeTubePayPerView.compileContract(rpc, ppvContract);
    
//     console.log(`📫 Contract Address: ${ppvCompiled.address}`);
//     console.log(`🔧 Using ${ppvCompiled.isFallback ? 'fallback P2PKH' : 'CashScript bytecode'}`);
    
//     // Fund contract with example video
//     const ppvTxid = await rpc.call('sendtoaddress', [ppvCompiled.address, 0.05]);
//     console.log(`💰 Video Funded: ${ppvTxid}`);
    
//     // Register a sample video
//     const creatorInfo = await rpc.call('getaddressinfo', [creatorAddress]);
//     const video = BlazeTubePayPerView.registerVideo(
//       'premium_tutorial_001',
//       'https://blazetube.com/videos/premium_tutorial_001.mp4',
//       creatorInfo.pubkey
//     );
    
//     console.log(`🎬 Video Registered: ${video.videoHash.substring(0, 16)}...`);
    
//     // Mine blocks to confirm
//     console.log('\n⛏️  Mining blocks to confirm contract...');
//     const minerAddress = await rpc.call('getnewaddress');
//     await rpc.call('generatetoaddress', [2, minerAddress]);
    
//     // Verify deployment
//     console.log('\n🔍 VERIFYING CONTRACT DEPLOYMENT');
//     await verifyDeployment(rpc, ppvCompiled.address);
    
//     console.log('\n🎉 PAY-PER-VIEW CONTRACT DEPLOYED SUCCESSFULLY!');
//     console.log('📺 Contract Details:');
//     console.log(`   ✅ Contract: ${PAY_PER_VIEW_CONTRACT.contractName}`);
//     console.log(`   ✅ Address: ${ppvCompiled.address}`);
//     console.log(`   ✅ Price: 0.05 BCH per view`);
//     console.log(`   ✅ Creator: ${creatorAddress}`);
//     console.log(`   ✅ Video Hash: ${video.videoHash.substring(0, 16)}...`);
//     console.log('\n🚀 Users can now pay to unlock premium videos!');
    
//   } catch (error) {
//     console.log('❌ Deployment error:', error.message);
//   }
// }

// async function verifyDeployment(rpc, contractAddress) {
//   try {
//     const balance = await rpc.call('getbalance');
//     console.log(`   💰 Wallet Balance: ${balance} BCH`);
    
//     // Check if contract has funds
//     const utxos = await rpc.call('listunspent', [0, 9999999, [contractAddress]]);
//     console.log(`   📄 Contract UTXOs: ${utxos.length}`);
    
//     if (utxos.length > 0) {
//       console.log(`   💸 Contract Balance: ${utxos[0].amount} BCH`);
//     }
    
//     const transactions = await rpc.call('listtransactions', ['*', 5]);
//     const contractTx = transactions.find(tx => tx.address === contractAddress);
    
//     if (contractTx) {
//       console.log(`   ✅ Contract funded: ${contractTx.amount} BCH`);
//     }
    
//   } catch (error) {
//     console.log(`   ⚠️  Verification warning: ${error.message}`);
//   }
// }

// // Run deployment
// deployPayPerViewContract();


const http = require('http');
const crypto = require('crypto');
const { Buffer } = require('buffer');
const fs = require('fs');

// Load PayPerView contract from JSON
const PAY_PER_VIEW_CONTRACT = JSON.parse(fs.readFileSync('./PayPerViewToken.json', 'utf8'));

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

class BlazeTubePayPerView {
  
  /**
   * Create PayPerView contract using JSON definition
   */
  static async createPayPerViewContract(rpc, videoPrice, creatorAddress) {
    const creatorInfo = await rpc.call('getaddressinfo', [creatorAddress]);
    
    // Convert price to satoshis
    const priceSatoshis = Math.round(videoPrice * 100000000);
    
    console.log(`📄 Contract: ${PAY_PER_VIEW_CONTRACT.contractName}`);
    console.log(`💰 Price: ${videoPrice} BCH (${priceSatoshis} satoshis)`);
    console.log(`👨‍🎨 Creator: ${creatorAddress}`);
    console.log(`🔑 PubKey: ${creatorInfo.pubkey.substring(0, 20)}...`);
    
    // Use the debug bytecode (hex) instead of human-readable opcodes
    const bytecode = PAY_PER_VIEW_CONTRACT.debug?.bytecode || PAY_PER_VIEW_CONTRACT.bytecode;
    
    return {
      contract: PAY_PER_VIEW_CONTRACT,
      parameters: {
        creatorPubkey: creatorInfo.pubkey,
        price: priceSatoshis,
        creatorPkh: this.getPubKeyHash(creatorInfo.pubkey)
      },
      bytecode: bytecode
    };
  }

  /**
   * Extract public key hash from public key (for P2PKH)
   */
  static getPubKeyHash(pubkey) {
    const pubKeyBuffer = Buffer.from(pubkey, 'hex');
    const hash = crypto.createHash('sha256').update(pubKeyBuffer).digest();
    const ripemd160 = crypto.createHash('ripemd160').update(hash).digest('hex');
    return ripemd160;
  }

  /**
   * Compile contract to get address
   */
  static async compileContract(rpc, contractDefinition) {
    try {
      console.log(`   🔧 Attempting to compile bytecode: ${contractDefinition.bytecode.substring(0, 40)}...`);
      
      // Use the bytecode from JSON and decode to get address
      const decodeResult = await rpc.call('decodescript', [contractDefinition.bytecode]);
      console.log(`   ✅ Successfully compiled CashScript contract`);
      return {
        address: decodeResult.p2sh,
        script: contractDefinition.bytecode,
        contract: contractDefinition.contract,
        isCashScript: true
      };
    } catch (error) {
      console.log(`   ⚠️  CashScript compilation failed: ${error.message}`);
      console.log(`   🔄 Falling back to standard P2PKH...`);
      
      // Fallback to standard P2PKH
      const pkh = this.getPubKeyHash(contractDefinition.parameters.creatorPubkey);
      const fallbackScript = `76a914${pkh}88ac`;
      const decodeResult = await rpc.call('decodescript', [fallbackScript]);
      return {
        address: decodeResult.p2sh,
        script: fallbackScript,
        contract: contractDefinition.contract,
        isFallback: true
      };
    }
  }

  /**
   * VIDEO REGISTRATION - Generate unique video hash
   */
  static registerVideo(videoID, videoUrl, creatorPubKey) {
    const hashInput = `${videoID}|${videoUrl}|${creatorPubKey}`;
    const videoHash = crypto.createHash('sha256').update(hashInput).digest('hex');

    return {
      videoHash,
      creatorPubKey,
      txHash: null,
      blockNumber: null
    };
  }
}

async function deployPayPerViewContract() {
  const rpc = new BCHRPC(18443);
  
  try {
    console.log('🎬 DEPLOYING PAY-PER-VIEW CONTRACT\n');
    
    // Get blockchain info
    const info = await rpc.call('getblockchaininfo');
    console.log(`📦 Current block: ${info.blocks}`);
    
    // Create creator wallet
    const creatorAddress = await rpc.call('getnewaddress', ['', 'legacy']);
    console.log(`👨‍🎨 Creator Address: ${creatorAddress}\n`);
    
    // 1. PAY-PER-VIEW CONTRACT
    console.log('1. 🎥 PAY-PER-VIEW CONTRACT');
    const ppvContract = await BlazeTubePayPerView.createPayPerViewContract(rpc, 0.05, creatorAddress);
    const ppvCompiled = await BlazeTubePayPerView.compileContract(rpc, ppvContract);
    
    console.log(`📫 Contract Address: ${ppvCompiled.address}`);
    console.log(`🔧 Using ${ppvCompiled.isCashScript ? 'CashScript' : 'fallback P2PKH'}`);
    
    // Fund contract with example video
    const ppvTxid = await rpc.call('sendtoaddress', [ppvCompiled.address, 0.05]);
    console.log(`💰 Video Funded: ${ppvTxid}`);
    
    // Register a sample video
    const creatorInfo = await rpc.call('getaddressinfo', [creatorAddress]);
    const video = BlazeTubePayPerView.registerVideo(
      'premium_tutorial_001',
      'https://blazetube.com/videos/premium_tutorial_001.mp4',
      creatorInfo.pubkey
    );
    
    console.log(`🎬 Video Registered: ${video.videoHash.substring(0, 16)}...`);
    
    // Mine blocks to confirm
    console.log('\n⛏️  Mining blocks to confirm contract...');
    const minerAddress = await rpc.call('getnewaddress');
    await rpc.call('generatetoaddress', [2, minerAddress]);
    
    // Verify deployment
    console.log('\n🔍 VERIFYING CONTRACT DEPLOYMENT');
    await verifyDeployment(rpc, ppvCompiled.address);
    
    console.log('\n🎉 PAY-PER-VIEW CONTRACT DEPLOYED SUCCESSFULLY!');
    console.log('📺 Contract Details:');
    console.log(`   ✅ Contract: ${PAY_PER_VIEW_CONTRACT.contractName}`);
    console.log(`   ✅ Address: ${ppvCompiled.address}`);
    console.log(`   ✅ Price: 0.05 BCH per view`);
    console.log(`   ✅ Creator: ${creatorAddress}`);
    console.log(`   ✅ Video Hash: ${video.videoHash.substring(0, 16)}...`);
    
    if (ppvCompiled.isFallback) {
      console.log('\n⚠️  NOTE: Using fallback P2PKH contract (simple payment to creator)');
      console.log('   To use CashScript features, update your JSON with hexadecimal bytecode');
    } else {
      console.log('\n🚀 CashScript PayPerView contract is LIVE!');
      console.log('   Users can now pay to unlock premium videos!');
    }
    
  } catch (error) {
    console.log('❌ Deployment error:', error.message);
  }
}

async function verifyDeployment(rpc, contractAddress) {
  try {
    const balance = await rpc.call('getbalance');
    console.log(`   💰 Wallet Balance: ${balance} BCH`);
    
    // Check if contract has funds
    const utxos = await rpc.call('listunspent', [0, 9999999, [contractAddress]]);
    console.log(`   📄 Contract UTXOs: ${utxos.length}`);
    
    if (utxos.length > 0) {
      console.log(`   💸 Contract Balance: ${utxos[0].amount} BCH`);
      console.log(`   🔒 Locked in contract: ${utxos[0].amount} BCH`);
    }
    
  } catch (error) {
    console.log(`   ⚠️  Verification warning: ${error.message}`);
  }
}

// Run deployment
deployPayPerViewContract();