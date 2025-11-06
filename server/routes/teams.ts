import express from 'express';
import { createTeam, listTeams, getTeam, addTeamMember } from '../controllers/teamsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createTeam);
router.get('/', authMiddleware, listTeams);
router.get('/:id', authMiddleware, getTeam);
router.post('/:id/members', authMiddleware, addTeamMember);

export default router;
