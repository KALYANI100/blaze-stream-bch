import express from 'express';
import { getDashboardOverview, getMyVideos, uploadVideoWithContract } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/protect.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Dashboard routes
router.get('/overview', protect, getDashboardOverview);
router.get('/videos/my-videos', protect, getMyVideos);

// Multer middleware applied **in the route**
router.post(
  '/videos/upload',
  protect,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  uploadVideoWithContract
);

export default router;
