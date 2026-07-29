import { InferSchemaType, model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String }],
    targetMuscles: [{ type: String }],
    recommendedFor: [{ type: String }],
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model('Workout', workoutSchema);

export default WorkoutModel;
