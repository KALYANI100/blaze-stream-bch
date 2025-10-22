// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from './config/db.js';
// Import routes (ESM syntax)
import walletRoutes from './routes/generatekeys.js'; // note the .js extension
import userRoutes from './routes/user.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import watchRoutes from './routes/watchRoutes.js';

// ← ADD THIS BLOCK
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ DATABASE CONNECTED');
  } catch (error) {
    console.error('❌ DATABASE FAILED:', error.message);
    process.exit(1);
  }
}
testConnection();


// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Middleware
app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use(express.json());


// Use routes
app.use('/api/generate', walletRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);

app.use('/api/videos',watchRoutes);

// Example: serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
});

export default app;
