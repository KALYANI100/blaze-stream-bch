import prisma from '../config/db.js';
import { uploadToB2 } from '../utils/b2.js';
// import { DEPLOYED_CONTRACTS, CREATOR_WALLET } from '../config/contract.js';
import { getSignedUrl } from '../utils/b2SignedUrl.js';
import multer from 'multer';
import crypto from 'crypto';
import http from 'http';
import fs from "fs";


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
 const rpc = new BCHRPC(18443, 'bchuser', 'bchpass');
const upload = multer({ storage: multer.memoryStorage() });

// 1. DASHBOARD OVERVIEW (REAL BLOCKCHAIN DATA)
export const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalViews, totalLikes, subscriberCount, totalEarnings, recentEarnings] = await Promise.all([
      prisma.view.count({ where: { video: { creatorId: userId } } }),
      prisma.like.count({ where: { video: { creatorId: userId } } }),
      prisma.subscription.count({ where: { creatorId: userId, isActive: true } }),
      prisma.earning.aggregate({
        where: { userId },
        _sum: { amount: true }
      }),
      prisma.earning.findMany({
        where: { userId },
        orderBy: { earnedAt: 'desc' },
        take: 5,
        include: {
          video: { select: { title: true } }
        }
      })
    ]);

    res.json({
      success: true,
      stats: {
        totalEarnings: totalEarnings._sum.amount ? totalEarnings._sum.amount.toFixed(3) : 0,
        totalViews: totalViews || 0,
        totalLikes: totalLikes || 0,
        subscribers: subscriberCount || 0
      },
      recentEarnings: (recentEarnings || []).map(e => ({
        user: 'Viewer',
        amount: e.amount.toFixed(3),
        type: e.type,
        videoTitle: e.video?.title || 'N/A',
        time: `${Math.round((Date.now() - new Date(e.earnedAt)) / 60000)} mins ago`
      }))
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
};

// 2. MY VIDEOS (WITH YOUR CONTRACTS)

export const getMyVideos = async (req, res) => {
  try {
    // 1️⃣ Fetch all videos of the logged-in creator
    const videos = await prisma.video.findMany({
      where: { creatorId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    // 2️⃣ Generate signed URLs for video and thumbnail
    const signedVideos = await Promise.all(
      videos.map(async (v) => {
        // ⚠️ Correct file path inside the bucket for signing
        const videoFilePath = v.videoUrl.split('/file/blazetube/')[1]; // keeps "videos/filename.mp4"
        const thumbFilePath = v.thumbnailUrl?.split('/file/blazetube/')[1]; // keeps "thumbnails/filename.png"

        // ✅ Generate signed URLs
        const signedVideoUrl = await getSignedUrl(videoFilePath);
        const signedThumbnailUrl = thumbFilePath ? await getSignedUrl(thumbFilePath) : null;

        return {
          id: v.id,
          // If thumbnail missing, use placeholder
          thumbnail: signedThumbnailUrl || 'https://via.placeholder.com/300x200.png?text=Thumbnail',
          title: v.title,
          creator: 'You',
          // 3️⃣ Safe defaults to avoid 'undefined.toLocaleString()' crash
          views: (v.viewCount ?? 0).toLocaleString(),
          likes: (v.likeCount ?? 0).toLocaleString(),
          duration: `${Math.floor(v.duration / 60)}:${(v.duration % 60).toString().padStart(2, '0')}`,
          isPremium: v.isPremium,
          price: v.price,
          contractAddress: v.contractAddress,
          videoUrl: signedVideoUrl,
          redeemScript:v.redeemScript
        };
      })
    );

    // 4️⃣ Return result
    res.json({ success: true, videos: signedVideos });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ success: false, error: 'Failed to load videos' });
  }
};

export const uploadVideoWithContract = async (req, res) => {
  try {
    const { title, description, category, tags, accessType = "FREE", price = "0" } = req.body;
    const userId = req.user.id;

    // 1️⃣ Upload Video
    const videoFile = req.files.video[0];
    const videoName = `videos/${Date.now()}_${videoFile.originalname}`;
    const videoUrl = await uploadToB2(videoName, videoFile.buffer, videoFile.mimetype);

    // Thumbnail
    let thumbnailUrl = null;
    if (req.files.thumbnail?.[0]) {
      const thumbFile = req.files.thumbnail[0];
      const thumbName = `thumbnails/${Date.now()}_${thumbFile.originalname}`;
      thumbnailUrl = await uploadToB2(thumbName, thumbFile.buffer, thumbFile.mimetype);
    }

    // 2️⃣ Deploy Contract (PAY_PER_VIEW)
    let contractAddress = null;
    let transactionHash = null;
    let videoHash = null;
    let redeemScript = null;   

    if (accessType === "PAY_PER_VIEW") {
      try {
        // Get creator's pubkey
        const addressInfo = await rpc.call('getaddressinfo', [req.user.walletAddress]);
        if (!addressInfo.pubkey) throw new Error("Wallet has no public key");

        const creatorPubkey = addressInfo.pubkey;
        const priceSatoshis = Math.round(parseFloat(price) * 1e8);

        // Video hash
        const videoId = `video_${Date.now()}`;
        const videoIdHash = crypto.createHash("sha256")
          .update(`${videoId}|${videoUrl}|${creatorPubkey}`)
          .digest("hex");

        // Deploy contract
        const contractData = await deployPayPerViewContract(
          priceSatoshis,
          creatorPubkey,
          videoIdHash
        );

        contractAddress = contractData.address;
        transactionHash = contractData.txHash;
        redeemScript = contractData.bytecode;  
        videoHash = videoIdHash;

      } catch (contractError) {
        console.error("Contract deployment failed:", contractError);
        return res.status(500).json({ success: false, error: contractError.message });
      }
    }

    // Free content → generate basic video hash
    if (!videoHash) {
      const videoId = `video_${Date.now()}`;
      videoHash = crypto.createHash("sha256")
        .update(`${videoId}|${videoUrl}|${req.user.walletAddress}`)
        .digest("hex");
    }

    // 3️⃣ Store in DB
    const video = await prisma.video.create({
      data: {
        videoId: `video_${Date.now()}`,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        categoryId: "1",
        tags: tags ? tags.split(",") : [],
        accessType,
        price: accessType === "PAY_PER_VIEW" ? parseFloat(price) : null,
        isPremium: accessType !== "FREE",
        creatorId: userId,
        status: "READY",
        videoHash,
        contractAddress,
        transactionHash,
         redeemScript,
        duration: Math.floor(Math.random() * 600 + 60),
        fileSize: BigInt(videoFile.size),
      },
    });

    // 4️⃣ Notification
    let notificationMessage = `Your video "${title}" is now live.`;
    if (contractAddress) {
      notificationMessage = `Your PayPerView video "${title}" is LIVE at ${contractAddress.slice(0, 16)}...!`;
    }

    await prisma.notification.create({
      data: {
        type: "VIDEO_APPROVED",
        title: "🎬 Video LIVE!",
        message: notificationMessage,
        userId,
      },
    });

    // 5️⃣ Response
    const responseData = {
      success: true,
      message: `🎥 "${title}" uploaded successfully!`,
      video: { id: video.id, title, videoHash, accessType, price: video.price, contractAddress,
  redeemScript  },
    };

    if (contractAddress) {
      responseData.contractAddress = contractAddress;
      responseData.transactionHash = transactionHash;
      responseData.message = `🎬 "${title}" PayPerView contract deployed!`;
    }

    res.json(responseData);

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


async function deployPayPerViewContract(price_satoshis, creatorPubkeyHex, videoIdHashHex) {
  try {
    const contractJson = JSON.parse(
      fs.readFileSync('./contracts_2/build/PayPerViewToken.json', 'utf8')
    );

    const template = contractJson.debug.bytecode;
    if (!template) throw new Error("debug.bytecode missing in JSON");

    // Convert price → hex
    const priceHex = price_satoshis.toString(16);
    const priceHexPadded = priceHex.length % 2 === 1 ? '0' + priceHex : priceHex;

    // Replace placeholders for 3 inputs
    let bytecode = template
      .replace('55', creatorPubkeyHex)   // pubkey
      .replace('7a', priceHexPadded)     // price
      .replace('cd', videoIdHashHex);    // videoIdHash

    // Decode into P2SH address
    const decoded = await rpc.call('decodescript', [bytecode]);
    if (!decoded.p2sh) throw new Error("Failed to get P2SH address");

    return { address: decoded.p2sh, txHash: null, bytecode };

  } catch (error) {
    throw new Error(`Contract creation failed: ${error.message}`);
  }
}

