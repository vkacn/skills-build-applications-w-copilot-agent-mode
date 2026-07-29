import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardModel.find()
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean();

    res.json({ resource: 'leaderboard', count: entries.length, entries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
