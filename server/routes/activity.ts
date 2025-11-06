import express from 'express';
import { listActivities, createActivity } from '../controllers/activityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, listActivities);
router.post('/', authMiddleware, createActivity);

export default router;
