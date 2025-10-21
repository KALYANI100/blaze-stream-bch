
import prisma from '../config/db.js';
export const getTrendingVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      where: { isPublished: true },
      orderBy: { views: 'desc' },
      take: 8,
      select: {
        id: true,
        title: true,
        thumbnail: true,
        creator: { select: { username: true } },
        views: true,
        likes: true,
        duration: true,
        isPremium: true,
        price: true
      }
    });

    res.json({
      success: true,
      videos: videos.map(v => ({
        ...v,
        creator: v.creator.username,
        views: v.views || 0,
        likes: v.likes || 0
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch trending videos' });
  }
};