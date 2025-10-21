import express from 'express';
import { getTrendingVideos } from '../controllers/videoController.js';

const router = express.Router();

router.get('/trending', getTrendingVideos);

export default router;
