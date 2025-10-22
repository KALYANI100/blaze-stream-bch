import prisma from '../config/db.js';
import axios from 'axios';
import { getSignedUrl } from '../utils/b2SignedUrl.js';
import { DEPLOYED_CONTRACTS } from '../config/contract.js';
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

// **1. GET WATCH VIDEO** (Main Watch Page)
export const getWatchVideo = async (req, res) => {
  try {
    let { id } = req.params;
    if (id.startsWith('id=')) id = id.slice(3);
    const userId = req.user.id;
    console.log(id,userId);
    console.log(typeof id, id); 

    // **FETCH FROM DATABASE**
    let video = await prisma.video.findUnique({
      where: { id },
      include: {
        creator: { 
          select: { 
            id: true, 
            username: true, 
            avatar: true, 
            subscriberCount: true,
            walletAddress: true 
          } 
        },
        _count: { 
          select: { likes: true, views: true } 
        },
        purchases: { where: { userId } },
        comments: {
          take: 10,
          include: {
            author: { select: { username: true, avatar: true } },
            _count: { select: { likes: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });


    if (!video) {
  return res.status(404).json({
    success: false,
    message: 'Video not found'
  });
}


    // **GENERATE SIGNED URLS**
    const videoPath = video.videoUrl?.split('/file/blazetube/')[1];
    const thumbPath = video.thumbnailUrl?.split('/file/blazetube/')[1];
    
    const [signedVideoUrl, signedThumbnailUrl] = await Promise.all([
      videoPath ? getSignedUrl(videoPath) : null,
      thumbPath ? getSignedUrl(thumbPath) : dummyVideos[0].thumbnail
    ]);

    // **VERIFY ACCESS** (UNLOCKING LOGIC)
    const userCanAccess = await verifyAccess(video, userId);
    
    // **GET RELATED VIDEOS & BCH PRICE**
    const [relatedVideos, bchPrice] = await Promise.all([
      getRelatedVideos(video.categoryId, id),
      getBchPrice()
    ]);

    // **FORMAT RESPONSE**
    const formattedVideo = formatVideo(video, signedVideoUrl, signedThumbnailUrl, userCanAccess, bchPrice);

    res.json({
      success: true,
      video: formattedVideo,
      relatedVideos,
      bchPrice
    });

  } catch (error) {
    console.error('Watch video error:', error);
    // const dummy = dummyVideos[0];
    res.json({
      success: false,
    //   video: formatDummyVideo(dummy),
    //   relatedVideos: getDummyRelatedVideos(dummy.category),
    //   bchPrice: 470
    });
  }
};

// **2. GET TRENDING VIDEOS**
export const getTrendingVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { viewCount: 'desc' },
      take: 8,
      include: {
        creator: { select: { username: true } },
        _count: { select: { views: true, likes: true } }
      }
    });

    const signedVideos = await Promise.all(
      videos.map(async (v) => {
        const thumbPath = v.thumbnailUrl?.split('/file/blazetube/')[1];
        const signedThumb = thumbPath ? await getSignedUrl(thumbPath) : dummyVideos[0].thumbnail;
        
        return {
          id: v.id,
          title: v.title,
          creator: v.creator.username,
          thumbnail: signedThumb,
          views: formatViews(v._count.views),
          likes: v._count.likes,
          duration: formatDuration(v.duration),
          isPremium: v.isPremium,
          price: v.price
        };
      })
    );

    res.json({ success: true, videos: signedVideos });
  } catch (error) {
    console.error('Trending videos error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch trending videos' });
  }
};

// ============================================
// ACTION CONTROLLERS
// ============================================

// **3. ADD COMMENT**
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: videoId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.create({
      data: { content, authorId: userId, videoId },
      include: {
        author: { select: { username: true, avatar: true } },
        _count: { select: { likes: true } }
      }
    });

    // **NOTIFY CREATOR**
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    await prisma.notification.create({
      data: {
        type: 'COMMENT',
        title: 'New Comment',
        message: `${req.user.username} commented on your video`,
        userId: video.creatorId
      }
    });

    res.json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        author: comment.author,
        likes: comment._count.likes,
        createdAt: comment.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// **4. LIKE VIDEO** (Toggle)
export const likeVideo = async (req, res) => {
  try {
    console.log("h");
   let { id: videoId } = req.params;
    
    if (videoId.startsWith('id=')) videoId = videoId.slice(3);
    const userId = req.user.id;

    const existingLike = await prisma.like.findFirst({ where: { userId, videoId } });

    if (existingLike) {
      // **UNLIKE**
      await prisma.like.delete({ where: { id: existingLike.id } });
      await prisma.video.update({ where: { id: videoId }, data: { likeCount: { decrement: 1 } } });
      return res.json({ success: true, action: 'unliked', likes: existingLike.likeCount - 1 });
    }

    // **LIKE**
    await prisma.like.create({ data: { userId, videoId, type: 'LIKE' } });
    await prisma.video.update({ where: { id: videoId }, data: { likeCount: { increment: 1 } } });

    const video = await prisma.video.findUnique({ where: { id: videoId }, select: { likeCount: true } });

    // **NOTIFY CREATOR**
    const videoWithCreator = await prisma.video.findUnique({ where: { id: videoId }, select: { creatorId: true } });
    await prisma.notification.create({
      data: { 
        type: 'LIKE', 
        title: 'New Like', 
        message: `${req.user.username} liked your video`, 
        userId: videoWithCreator.creatorId 
      }
    });

    res.json({ success: true, action: 'liked', likes: video.likeCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// **5. TIP VIDEO**
export const purchaseVideo = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const userId = req.user.id;

    // 1️⃣ Fetch video & user wallet
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video.isPremium) return res.status(400).json({ success: false, error: 'Video is free' });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const creator = await prisma.user.findUnique({ where: { id: video.creatorId } });

    if (!user.walletAddress || !creator.walletAddress) {
      return res.status(400).json({ success: false, error: 'Wallet addresses missing' });
    }

    // 2️⃣ Construct & send transaction (from user → contract/creator)
    const txHash = await sendBchTransaction(user.walletAddress, DEPLOYED_CONTRACTS.PAY_PER_VIEW, video.price);

    // 3️⃣ Record purchase
    const purchase = await prisma.videoPurchase.create({
      data: { amount: video.price, txHash, videoId, userId }
    });

    // 4️⃣ Add earnings to creator
    await prisma.earning.create({
      data: { amount: video.price, type: 'VIDEO_SALE', userId: creator.id, videoId }
    });

    // 5️⃣ Notify creator
    await prisma.notification.create({
      data: {
        type: 'VIDEO_PURCHASED',
        title: '🎬 Video Sold!',
        message: `${user.username} purchased your video for ${video.price} BCH`,
        userId: creator.id
      }
    });

    res.json({ success: true, purchase, message: '✅ Video UNLOCKED successfully!' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ------------------- TIP VIDEO -------------------
export const tipVideo = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const { amount, message } = req.body;
    const userId = req.user.id;

    // 1️⃣ Fetch video & user wallet
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const creator = await prisma.user.findUnique({ where: { id: video.creatorId } });

    if (!user.walletAddress || !creator.walletAddress) {
      return res.status(400).json({ success: false, error: 'Wallet addresses missing' });
    }

    // 2️⃣ Construct & send transaction (from user → tip contract)
    const txHash = await sendBchTransaction(user.walletAddress, DEPLOYED_CONTRACTS.TIP, amount);

    // 3️⃣ Record tip
    const tip = await prisma.tip.create({
      data: { amount, message, txHash, fromUserId: userId, toUserId: creator.id, videoId }
    });

    // 4️⃣ Add earnings to creator
    await prisma.earning.create({
      data: { amount, type: 'TIP', userId: creator.id, videoId }
    });

    // 5️⃣ Notify creator
    await prisma.notification.create({
      data: {
        type: 'NEW_TIP',
        title: `💰 Tip: ${amount} BCH`,
        message: message || 'Thank you for the tip!',
        userId: creator.id
      }
    });

    res.json({ success: true, tip });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ------------------- HELPER: Send BCH from sender → receiver -------------------
async function sendBchTransaction(sender, receiver, amount) {
  // 1️⃣ List unspent UTXOs for sender
  const utxos = await rpc.call('listunspent', [0, 9999999, [sender]]);
  if (!utxos.length) throw new Error('Sender has no funds');

  // 2️⃣ Select UTXO(s) to cover amount + fee
  let total = 0;
  const inputs = [];
  for (const utxo of utxos) {
    inputs.push({ txid: utxo.txid, vout: utxo.vout });
    total += utxo.amount;
    if (total >= amount + 0.00001) break; // small fee buffer
  }
  if (total < amount) throw new Error('Insufficient funds');

  // 3️⃣ Prepare outputs
  const outputs = {};
  outputs[receiver] = amount;
  const change = parseFloat((total - amount - 0.00001).toFixed(8));
  if (change > 0) outputs[sender] = change; // return change

  // 4️⃣ Create, sign, and send raw transaction
  const rawTx = await rpc.call('createrawtransaction', [inputs, outputs]);
  const signedTx = await rpc.call('signrawtransactionwithwallet', [rawTx]);
  if (!signedTx.complete) throw new Error('Transaction signing failed');

  const txHash = await rpc.call('sendrawtransaction', [signedTx.hex]);
  return txHash;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// **VERIFY ACCESS** (UNLOCK CHECK)
export async function verifyAccess(video, userId) {
  if (!video.isPremium) return true;  // Free videos

  // **CHECK PURCHASE RECORD** ✅
  const purchase = await prisma.videoPurchase.findFirst({
    where: { videoId: video.id, userId }
  });
  
  return !!purchase;  // true = UNLOCKED
}

// **GET RELATED VIDEOS**
export async function getRelatedVideos(categoryId, excludeId) {
  const videos = await prisma.video.findMany({
    where: { categoryId, id: { not: excludeId }, status: 'READY' },
    take: 5,
    orderBy: { viewCount: 'desc' },
    include: {
      creator: { select: { username: true } },
      _count: { select: { views: true } }
    }
  });

  const related = await Promise.all(videos.map(async (v) => {
    const thumbPath = v.thumbnailUrl?.split('/file/blazetube/')[1];
    const signedThumb = thumbPath ? await getSignedUrl(thumbPath) : dummyVideos[0].thumbnail;
    
    return {
      id: v.id,
      title: v.title,
      creator: v.creator.username,
      thumbnail: signedThumb,
      views: formatViews(v._count.views),
      duration: formatDuration(v.duration),
      isPremium: v.isPremium,
      price: v.price
    };
  }));

  return related.length > 0 ? related : getDummyRelatedVideos('Blockchain');
}

// **GET BCH PRICE**
export async function getBchPrice() {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd');
    return data['bitcoin-cash'].usd;
  } catch {
    return 470;  // Oct 2025 fallback
  }
}

// **FORMAT VIDEO**
export function formatVideo(video, signedVideoUrl, signedThumbnailUrl, userCanAccess, bchPrice) {
  return {
    id: video.id,
    title: video.title,
    description: video.description || '',
    creator: video.creator,
    views: formatViews(video._count.views),
    likes: video._count.likes,
    duration: formatDuration(video.duration),
    isPremium: video.isPremium,
    price: video.price || 0,
    usdPrice: video.price ? (video.price * bchPrice).toFixed(2) : '0.00',
    thumbnail: signedThumbnailUrl,
    videoUrl: signedVideoUrl,
    publishedAt: formatPublishedAt(video.publishedAt || video.createdAt),
    comments: video.comments.map(c => ({
      id: c.id,
      content: c.content,
      author: c.author,
      likes: c._count.likes,
      createdAt: c.createdAt
    })),
    userCanAccess,        // ✅ FROM verifyAccess()
    hasPurchased: video.purchases.length > 0
  };
}

// **FORMAT HELPERS**
export function formatDummyVideo(video) {
  return { ...video, userCanAccess: true, hasPurchased: false, usdPrice: (video.price * 470).toFixed(2) };
}

export function getDummyRelatedVideos(category) {
  return dummyVideos.filter(v => v.category === category && v.id !== '1').slice(0, 5);
}

export function formatViews(count) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

export function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function formatPublishedAt(date) {
  const diffDays = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
}