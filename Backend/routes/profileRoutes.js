import express from 'express';
import prisma from '../config/db.js';
import { getSignedUrl } from '../utils/b2SignedUrl.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

// JWT Protection
router.use(protect);

/**
 * GET /api/profile
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        walletAddress: true,
        subscriberCount: true,
        totalEarnings: true,
        totalViews: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // 2. Get user videos
    const videos = await prisma.video.findMany({
      where: { creatorId: userId, status: "READY" },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        viewCount: true,
        likeCount: true,
        duration: true,
        isPremium: true,
        price: true,
        contractAddress: true,
        totalEarnings: true,
        createdAt: true
      },
    });

    // Add signed thumbnail URLs
    const videosWithSignedUrls = await Promise.all(
      videos.map(async (v) => {
        const thumbPath = v.thumbnailUrl?.split("/file/blazetube/")[1];
        return {
          ...v,
          thumbnailUrl: v.thumbnailUrl ? await getSignedUrl(thumbPath) : null
        };
      })
    );

    // 3. Subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: { subscriberId: userId, isActive: true },
      select: {
        id: true,
        tier: true,
        expiresAt: true,
        creator: {
          select: { username: true, avatar: true },
        },
      },
    });

    // 4. Liked videos
    const likedRaw = await prisma.like.findMany({
      where: { userId, videoId: { not: null } },
      take: 12,
      orderBy: { createdAt: "desc" },
      select: {
        video: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            viewCount: true,
            likeCount: true,
            duration: true,
            creator: { select: { username: true } }
          },
        }
      },
    });

    const likedVideos = await Promise.all(
      likedRaw.map(async ({ video }) => {
        const path = video.thumbnailUrl?.split("/file/blazetube/")[1];
        return {
          id: video.id,
          title: video.title,
          creator: video.creator.username,
          thumbnailUrl: video.thumbnailUrl ? await getSignedUrl(path) : null,
           viewCount: Number(video.viewCount || 0),  // ✅ match main videos
      likeCount: Number(video.likeCount || 0),  // ✅ match main videos
          views: Number(video.viewCount || 0),
          likes: Number(video.likeCount || 0),
          duration: Number(video.duration || 0),
        };
      })
    );

    // 5. Response
    res.json({
      success: true,
      data: {
        user,
        videos: videosWithSignedUrls,
        subscriptions,
        likedVideos,
        stats: {
          videoCount: videos.length,
          totalLikes: videos.reduce((s, v) => s + (v.likeCount || 0), 0)
        }
      }
    });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to load profile",
      details: err.message
    });
  }
});

export default router;
