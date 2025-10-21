import express from 'express';
import multer from 'multer';
import { userSetup } from '../controllers/userController.js';

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post('/setup', upload.single('avatar'), userSetup);

// Export the router
export default router;
