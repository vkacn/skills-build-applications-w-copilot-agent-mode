import { InferSchemaType, model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    period: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
