import { InferSchemaType, model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      required: true,
      enum: ['run', 'ride', 'strength', 'yoga', 'swim', 'walk'],
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    intensity: { type: String, required: true, enum: ['low', 'moderate', 'high'] },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model('Activity', activitySchema);

export default ActivityModel;
