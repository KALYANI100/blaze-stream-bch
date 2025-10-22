import prisma from '../config/db.js';
import { getSignedUrl } from '../utils/b2SignedUrl.js';

export const getTrendingVideos = async (req, res) => {
  try {
    // 1️⃣ Fetch top 8 trending videos ordered by view count
    const videos = await prisma.video.findMany({
      orderBy: {
        views: {
          _count: 'desc'
        }
      },
      take: 8,
      select: {
        id: true,
        title: true,
        videoUrl: true,
        thumbnailUrl: true,
        duration: true,
        isPremium: true,
        price: true,
        creator: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            views: true,
            likes: true,
          },
        },
      },
    });

    // 2️⃣ Generate signed URLs for each video + thumbnail
    const signedVideos = await Promise.all(
      videos.map(async (v) => {
        // Extract file paths relative to your B2 bucket
        const videoFilePath = v.videoUrl?.split('/file/blazetube/')[1];
        const thumbFilePath = v.thumbnailUrl?.split('/file/blazetube/')[1];

        const signedVideoUrl = videoFilePath
          ? await getSignedUrl(videoFilePath)
          : null;

        const signedThumbnailUrl = thumbFilePath
          ? await getSignedUrl(thumbFilePath)
          : 'https://via.placeholder.com/300x200.png?text=No+Thumbnail';


        return {
          id: v.id,
          title: v.title,
          creator: v.creator.username,
          thumbnail: signedThumbnailUrl,
          videoUrl: signedVideoUrl,
          views: v._count.views || 0,
          likes: v._count.likes || 0,
           duration: `${Math.floor(v.duration / 60)}:${(v.duration % 60).toString().padStart(2, '0')}`,
          isPremium: v.isPremium,
          price: v.price,
        };
      })
    );

    // 3️⃣ Send response
    res.json({
      success: true,
      videos: signedVideos,
    });
  } catch (error) {
    console.error('Trending videos error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending videos',
    });
  }
};
