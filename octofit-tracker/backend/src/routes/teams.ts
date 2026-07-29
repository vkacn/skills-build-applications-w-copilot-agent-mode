import { Router } from 'express';
import TeamModel from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const items = await TeamModel.find()
      .populate('members', 'name email fitnessLevel')
      .sort({ totalPoints: -1 })
      .lean();

    res.json({ resource: 'teams', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
