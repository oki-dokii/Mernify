import express from 'express';
import { sendInvite } from '../controllers/inviteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, sendInvite);

export default router;
