const express = require('express');
const { protect } = require('../middlewares/protect');
const watchController = require('../controllers/watchController');

const router = express.Router();

// **GET ROUTES**
router.get('/trending', watchController.getTrendingVideos);
router.get('/watch/:id', protect, watchController.getWatchVideo);

// **ACTION ROUTES** (All Protected)
router.post('/:id/comment', protect, watchController.addComment);
router.post('/:id/like', protect, watchController.likeVideo);
router.post('/:id/tip', protect, watchController.tipVideo);
router.post('/:id/purchase', protect, watchController.purchaseVideo);  // ✅ UNLOCKING

router.post("/:id/view", protect, watchController.incrementView);

module.exports = router;