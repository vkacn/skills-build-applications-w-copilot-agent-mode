import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    goals: [{ type: String, required: true }],
    weeklyTargetMinutes: { type: Number, required: true, min: 30 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model('User', userSchema);

export default UserModel;
