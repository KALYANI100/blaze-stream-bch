import express from 'express';
import { walletLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/wallet-login', walletLogin);  // ← NEW ROUTE

export default router;