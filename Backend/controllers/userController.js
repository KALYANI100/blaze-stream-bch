import prisma from '../config/db.js';
import jwt from 'jsonwebtoken';
import { uploadToB2 } from '../utils/b2.js';

export const userSetup = async (req, res) => {
  try {
    const { username, email, bio, socialLinks, walletAddress } = req.body;

    // 1. Validate
    if (!username || !email || !walletAddress) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username, email, and wallet address required' 
      });
    }

    // 2. Check existing
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }, { walletAddress }] }
    });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username, email, or wallet already exists' 
      });
    }

    // 3. Upload avatar to B2
    let avatarUrl = null;
    if (req.file) {
      const fileName = `avatars/${Date.now()}_${req.file.originalname}`;
      avatarUrl = await uploadToB2(
        fileName,
        req.file.buffer,
        req.file.mimetype
      );
    }

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        bio,
        avatar: avatarUrl,
        socialLinks: socialLinks ? JSON.parse(socialLinks) : [],
        walletAddress
      }
    });

    // 5. JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        walletAddress: user.walletAddress
      },
      token
    });

  } catch (error) {
    console.error('User setup error:', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};