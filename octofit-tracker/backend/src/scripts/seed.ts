import mongoose from 'mongoose';
import ActivityModel from '../models/activity.js';
import LeaderboardModel from '../models/leaderboard.js';
import TeamModel from '../models/team.js';
import UserModel from '../models/user.js';
import WorkoutModel from '../models/workout.js';

const connectionString = 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Maya Thompson',
        email: 'maya.thompson@octofit.dev',
        fitnessLevel: 'advanced',
        goals: ['Improve 10K pace', 'Increase mobility'],
        weeklyTargetMinutes: 320,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@octofit.dev',
        fitnessLevel: 'intermediate',
        goals: ['Build upper-body strength', 'Exercise 5 days/week'],
        weeklyTargetMinutes: 260,
      },
      {
        name: 'Avery Patel',
        email: 'avery.patel@octofit.dev',
        fitnessLevel: 'beginner',
        goals: ['Lose 5kg', 'Complete first 5K'],
        weeklyTargetMinutes: 180,
      },
      {
        name: 'Sofia Nguyen',
        email: 'sofia.nguyen@octofit.dev',
        fitnessLevel: 'intermediate',
        goals: ['Boost endurance', 'Improve sleep quality'],
        weeklyTargetMinutes: 240,
      },
      {
        name: 'Diego Rivera',
        email: 'diego.rivera@octofit.dev',
        fitnessLevel: 'advanced',
        goals: ['Maintain race fitness', 'Reduce recovery time'],
        weeklyTargetMinutes: 300,
      },
    ]);

    const userByEmail = new Map(users.map((user) => [user.email, user]));

    const teams = await TeamModel.insertMany([
      {
        name: 'Summit Sprinters',
        description: 'Cardio-first team focused on speed and consistency.',
        members: [
          userByEmail.get('maya.thompson@octofit.dev')!._id,
          userByEmail.get('sofia.nguyen@octofit.dev')!._id,
        ],
        totalPoints: 980,
      },
      {
        name: 'Iron Pulse',
        description: 'Strength and hybrid training challenge group.',
        members: [
          userByEmail.get('jordan.lee@octofit.dev')!._id,
          userByEmail.get('diego.rivera@octofit.dev')!._id,
          userByEmail.get('avery.patel@octofit.dev')!._id,
        ],
        totalPoints: 920,
      },
    ]);

    const teamByName = new Map(teams.map((team) => [team.name, team]));

    await UserModel.bulkWrite([
      {
        updateOne: {
          filter: { email: 'maya.thompson@octofit.dev' },
          update: { team: teamByName.get('Summit Sprinters')!._id },
        },
      },
      {
        updateOne: {
          filter: { email: 'sofia.nguyen@octofit.dev' },
          update: { team: teamByName.get('Summit Sprinters')!._id },
        },
      },
      {
        updateOne: {
          filter: { email: 'jordan.lee@octofit.dev' },
          update: { team: teamByName.get('Iron Pulse')!._id },
        },
      },
      {
        updateOne: {
          filter: { email: 'diego.rivera@octofit.dev' },
          update: { team: teamByName.get('Iron Pulse')!._id },
        },
      },
      {
        updateOne: {
          filter: { email: 'avery.patel@octofit.dev' },
          update: { team: teamByName.get('Iron Pulse')!._id },
        },
      },
    ]);

    await ActivityModel.insertMany([
      {
        user: userByEmail.get('maya.thompson@octofit.dev')!._id,
        team: teamByName.get('Summit Sprinters')!._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 560,
        intensity: 'high',
        completedAt: new Date('2026-07-26T06:40:00.000Z'),
      },
      {
        user: userByEmail.get('sofia.nguyen@octofit.dev')!._id,
        team: teamByName.get('Summit Sprinters')!._id,
        type: 'yoga',
        durationMinutes: 40,
        caloriesBurned: 180,
        intensity: 'low',
        completedAt: new Date('2026-07-26T18:15:00.000Z'),
      },
      {
        user: userByEmail.get('jordan.lee@octofit.dev')!._id,
        team: teamByName.get('Iron Pulse')!._id,
        type: 'strength',
        durationMinutes: 65,
        caloriesBurned: 470,
        intensity: 'high',
        completedAt: new Date('2026-07-25T17:30:00.000Z'),
      },
      {
        user: userByEmail.get('diego.rivera@octofit.dev')!._id,
        team: teamByName.get('Iron Pulse')!._id,
        type: 'ride',
        durationMinutes: 75,
        caloriesBurned: 710,
        intensity: 'moderate',
        completedAt: new Date('2026-07-24T12:10:00.000Z'),
      },
      {
        user: userByEmail.get('avery.patel@octofit.dev')!._id,
        team: teamByName.get('Iron Pulse')!._id,
        type: 'walk',
        durationMinutes: 35,
        caloriesBurned: 160,
        intensity: 'low',
        completedAt: new Date('2026-07-23T07:45:00.000Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      {
        team: teamByName.get('Summit Sprinters')!._id,
        period: '2026-W30',
        points: 980,
        rank: 1,
      },
      {
        team: teamByName.get('Iron Pulse')!._id,
        period: '2026-W30',
        points: 920,
        rank: 2,
      },
    ]);

    await WorkoutModel.insertMany([
      {
        title: 'Tempo 5K Builder',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 45,
        equipment: ['Running shoes', 'Fitness watch'],
        targetMuscles: ['Hamstrings', 'Calves', 'Core'],
        recommendedFor: ['Improve race pace', 'Boost endurance'],
      },
      {
        title: 'Foundation Strength Circuit',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 35,
        equipment: ['Dumbbells', 'Exercise mat'],
        targetMuscles: ['Chest', 'Back', 'Shoulders'],
        recommendedFor: ['Build confidence', 'Increase lean mass'],
      },
      {
        title: 'Athlete Mobility Flow',
        category: 'mobility',
        difficulty: 'advanced',
        durationMinutes: 30,
        equipment: ['Yoga mat', 'Resistance band'],
        targetMuscles: ['Hips', 'Lower back', 'Thoracic spine'],
        recommendedFor: ['Recovery', 'Injury prevention'],
      },
    ]);

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] =
      await Promise.all([
        UserModel.countDocuments(),
        TeamModel.countDocuments(),
        ActivityModel.countDocuments(),
        LeaderboardModel.countDocuments(),
        WorkoutModel.countDocuments(),
      ]);

    console.log(
      `Inserted users=${userCount}, teams=${teamCount}, activities=${activityCount}, leaderboard=${leaderboardCount}, workouts=${workoutCount}`
    );

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
