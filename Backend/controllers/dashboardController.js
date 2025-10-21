import prisma from '../config/db.js';
import { uploadToB2 } from '../utils/b2.js';
import { DEPLOYED_CONTRACTS, CREATOR_WALLET } from '../config/contract.js';
import { getSignedUrl } from '../utils/b2SignedUrl.js';
import multer from 'multer';
import crypto from 'crypto';
import http from 'http';


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

// 3. UPLOAD VIDEO (USES YOUR LIVE CONTRACTS) ✅
// export const uploadVideoWithContract = async (req, res) => {
//   try {
//     const { title, description, category, tags, accessType = 'FREE', price = '0' } = req.body;
//     const userId = req.user.id;

//     // UPLOAD TO B2
//     const videoFile = req.files.video[0];
//     const videoName = `videos/${Date.now()}_${videoFile.originalname}`;
//     const videoUrl = await uploadToB2(videoName, videoFile.buffer, videoFile.mimetype);

//     let thumbnailUrl = null;
//     if (req.files.thumbnail?.[0]) {
//       const thumbFile = req.files.thumbnail[0];
//       const thumbName = `thumbnails/${Date.now()}_${thumbFile.originalname}`;
//       thumbnailUrl = await uploadToB2(thumbName, thumbFile.buffer, thumbFile.mimetype);
//     }

//     // **USE YOUR LIVE CONTRACT**
//     const contractAddress = DEPLOYED_CONTRACTS[accessType.replace('_', '').toUpperCase()] || null;

//     // **VIDEO HASH** (for on-chain registration)
//     const videoId = `video_${Date.now()}`;
//     const videoHash = crypto.createHash('sha256')
//       .update(`${videoId}|${videoUrl}|${req.user.walletAddress}`)
//       .digest('hex');

//     // **FUND CONTRACT** (send price to YOUR deployed contract)
//     if (accessType !== 'FREE' && contractAddress) {
//       await rpc.call('sendtoaddress', [contractAddress, parseFloat(price)]);
//     }

//     // SAVE TO DB
//     const video = await prisma.video.create({
//       data: {
//         title,
//         description,
//         videoUrl,
//         thumbnailUrl,
//         categoryId: category || 'default',
//         tags: tags ? tags.split(',') : [],
//         accessType,
//         price: accessType === 'PAY_PER_VIEW' ? parseFloat(price) : null,
//         isPremium: accessType !== 'FREE',
//         creatorId: userId,
//         status: 'READY',
//         videoHash,
//         contractAddress,
//         duration: Math.floor(Math.random() * 600 + 60),
//         fileSize: BigInt(videoFile.size)
//       }
//     });

//     // NOTIFICATION
//     await prisma.notification.create({
//       data: {
//         type: 'VIDEO_APPROVED',
//         title: '🎬 Video LIVE!',
//         message: `Your video "${title}" is now accessible via contract: ${contractAddress?.slice(0, 16)}...`,
//         userId
//       }
//     });

//     res.json({
//       success: true,
//       message: `🎥 "${title}" LIVE on ${contractAddress?.slice(0, 16)}...!`,
//       video: {
//         id: video.id,
//         title,
//         contractAddress,
//         videoHash,
//         accessType,
//         price: video.price
//       }
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// export const uploadVideoWithContract = async (req, res) => {
//   try {
//     const { title, description, category, tags, accessType = 'FREE', price = '0' } = req.body;
//     const userId = req.user.id;

//     // ✅ Dummy video and thumbnail URLs for testing
//     const videoUrl = 'https://example.com/dummy-video.mp4';
//     const thumbnailUrl = 'https://via.placeholder.com/300x200.png?text=Dummy+Thumbnail';

//     // ✅ Use your live contract (if available)
//     const contractAddress = DEPLOYED_CONTRACTS[accessType.replace('_', '').toUpperCase()] || null;

//     // ✅ Create hash for on-chain reference
//     const videoId = `video_${Date.now()}`;
//     const videoHash = crypto.createHash('sha256')
//       .update(`${videoId}|${videoUrl}|${req.user.walletAddress}`)
//       .digest('hex');

//     // ✅ If premium, simulate funding contract
//    // For testing, skip sending BCH
// if (accessType !== 'FREE' && contractAddress && parseFloat(price) > 0) {
//   await rpc.call('sendtoaddress', [contractAddress, parseFloat(price)]);
// }



//     // ✅ Save video metadata in DB
//     const video = await prisma.video.create({
//       data: {
//          videoId,
//         title,
//         description,
//         videoUrl,
//         thumbnailUrl,
//         categoryId: '1', 
//         tags: tags ? tags.split(',') : [],
//         accessType,
//         price: accessType === 'PAY_PER_VIEW' ? parseFloat(price) : null,
//         isPremium: accessType !== 'FREE',
//         creatorId: userId,
//         status: 'READY',
//         videoHash,
//         contractAddress,
//         duration: Math.floor(Math.random() * 600 + 60),
//         fileSize: BigInt(1024 * 500), // pretend 500 KB
//       },
//     });

//     // ✅ Send notification
//     await prisma.notification.create({
//       data: {
//         type: 'VIDEO_APPROVED',
//         title: '🎬 Video LIVE!',
//         message: `Your video "${title}" is now accessible via contract: ${contractAddress?.slice(0, 16)}...`,
//         userId,
//       },
//     });

//     // ✅ Response
//     res.json({
//       success: true,
//       message: `🎥 "${title}" LIVE on ${contractAddress?.slice(0, 16)}...!`,
//       video: {
//         id: video.id,
//         title,
//         contractAddress,
//         videoHash,
//         accessType,
//         price: video.price,
//       },
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

export const uploadVideoWithContract = async (req, res) => {
  try {
    const { title, description, category, tags, accessType = 'FREE', price = '0' } = req.body;
    const userId = req.user.id;

    // ✅ Upload video to Backblaze B2
    const videoFile = req.files.video[0];
    const videoName = `videos/${Date.now()}_${videoFile.originalname}`;
    const videoUrl = await uploadToB2(videoName, videoFile.buffer, videoFile.mimetype);

    // ✅ Upload thumbnail if provided
    let thumbnailUrl = null;
    if (req.files.thumbnail?.[0]) {
      const thumbFile = req.files.thumbnail[0];
      const thumbName = `thumbnails/${Date.now()}_${thumbFile.originalname}`;
      thumbnailUrl = await uploadToB2(thumbName, thumbFile.buffer, thumbFile.mimetype);
    }

    // ✅ Use your live contract (if available)
    const contractAddress = DEPLOYED_CONTRACTS[accessType.replace('_', '').toUpperCase()] || null;

    // ✅ Create hash for on-chain reference
    const videoId = `video_${Date.now()}`;
    const videoHash = crypto.createHash('sha256')
      .update(`${videoId}|${videoUrl}|${req.user.walletAddress}`)
      .digest('hex');

    // ✅ If premium, fund contract (only if price > 0)
    if (accessType !== 'FREE' && contractAddress && parseFloat(price) > 0) {
      await rpc.call('sendtoaddress', [contractAddress, parseFloat(price)]);
    }

    // ✅ Save video metadata in DB
    const video = await prisma.video.create({
      data: {
        videoId,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        categoryId: '1', // default category for testing
        tags: tags ? tags.split(',') : [],
        accessType,
        price: accessType === 'PAY_PER_VIEW' ? parseFloat(price) : null,
        isPremium: accessType !== 'FREE',
        creatorId: userId,
        status: 'READY',
        videoHash,
        contractAddress,
        duration: Math.floor(Math.random() * 600 + 60),
        fileSize: BigInt(videoFile.size),
      },
    });

    // ✅ Send notification
    await prisma.notification.create({
      data: {
        type: 'VIDEO_APPROVED',
        title: '🎬 Video LIVE!',
        message: `Your video "${title}" is now accessible via contract: ${contractAddress?.slice(0, 16)}...`,
        userId,
      },
    });

    // ✅ Response
    res.json({
      success: true,
      message: `🎥 "${title}" LIVE on ${contractAddress?.slice(0, 16)}...!`,
      video: {
        id: video.id,
        title,
        contractAddress,
        videoHash,
        accessType,
        price: video.price,
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
