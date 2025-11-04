import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';  // ← SAME IMPORT


export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Access denied. No token provided' 
      });
    }

    // **VERIFY SAME JWT FORMAT**
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // **GET USER BY ID** (same as userSetup flow)
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id } 
    });
    console.log(user);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    // **ATTACH SAME USER DATA**
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      walletAddress: user.walletAddress,
      avatar: user.avatar
    };
    
    next();

  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ 
      success: false, 
      error: 'Invalid token' 
    });
  }
};