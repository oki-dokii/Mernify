import express from 'express';
import { updateProfile, deleteAccount, exportData } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/profile', authMiddleware, updateProfile);
router.delete('/account', authMiddleware, deleteAccount);
router.get('/export', authMiddleware, exportData);

export default router;
