import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';  // ← SAME IMPORT AS YOUR userSetup

// **WALLET LOGIN - SAME JWT FORMAT AS userSetup**
export const walletLogin = async (req, res) => {
  try {
    const { walletAddress, publicKey } = req.body;

    // 1. FIND USER BY WALLET ADDRESS
    let user = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (!user) {
      // 2. USER NOT FOUND - RETURN SETUP NEEDED
      return res.json({
        success: false,
        message: 'User not found. Please complete setup.',
        needsSetup: true
      });
    }

    // 3. USER FOUND - ISSUE SAME JWT FORMAT
    const token = jwt.sign(
      { id: user.id, email: user.email },  // ← EXACT SAME AS userSetup!
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. RETURN SAME RESPONSE FORMAT
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        walletAddress: user.walletAddress
      },
      token  // ← SAME AS userSetup
    });

  } catch (error) {
    console.error('Wallet login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};