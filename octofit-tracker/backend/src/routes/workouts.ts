import { Router } from 'express';
import WorkoutModel from '../models/workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const items = await WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();

    res.json({ resource: 'workouts', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
