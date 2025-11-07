import { RequestHandler } from 'express';
import { Team } from '../models/Team';
import mongoose from 'mongoose';

export const createTeam: RequestHandler = async (req, res, next) => {
  try {
    const anyReq: any = req;
    const ownerId = anyReq.userId;
    if (!ownerId) return res.status(401).json({ message: 'Not authenticated' });

    const { name, description } = req.body;
    const team = await Team.create({
      name,
      description,
      ownerId,
      members: [{ userId: ownerId, role: 'admin', joinedAt: new Date() }],
    });

    // Create activity
    const { Activity } = await import('../models/Activity');
    await Activity.create({
      userId: ownerId,
      action: `created team \"${name}\"`,
      entityType: 'team',
      entityId: team._id,
    });

    res.status(201).json({ team });
  } catch (err) {
    next(err);
  }
};

export const listTeams: RequestHandler = async (req, res, next) => {
  try {
    const anyReq: any = req;
    const userId = anyReq.userId;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const teams = await Team.find({
      $or: [{ ownerId: userId }, { 'members.userId': userId }],
    })
      .populate('members.userId', 'name email')
      .lean();

    res.json({ teams });
  } catch (err) {
    next(err);
  }
};

export const getTeam: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'Invalid id' });

    const team = await Team.findById(id)
      .populate('members.userId', 'name email')
      .lean();
    if (!team) return res.status(404).json({ message: 'Team not found' });

    res.json({ team });
  } catch (err) {
    next(err);
  }
};

export const addTeamMember: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'Invalid id' });

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    team.members.push({
      userId,
      role: role || 'member',
      joinedAt: new Date(),
    });
    await team.save();

    const populated = await Team.findById(id).populate(
      'members.userId',
      'name email'
    );
    res.json({ team: populated });
  } catch (err) {
    next(err);
  }
};
