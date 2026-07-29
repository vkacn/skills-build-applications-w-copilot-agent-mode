import { Router } from 'express';
import ActivityModel from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await ActivityModel.find()
      .populate('user', 'name')
      .populate('team', 'name')
      .sort({ completedAt: -1 })
      .lean();

    res.json({ resource: 'activities', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
