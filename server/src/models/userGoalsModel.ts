import mongoose, { Document, Schema, Model } from "mongoose";

interface WeightGoals {
  startingWeight: number;
  currentWeight: number;
  goalWeight: number;
}

interface NutritionGoals {
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
}

interface UserGoals extends Document {
  userId: Schema.Types.ObjectId;
  weightGoals: WeightGoals;
  nutritionGoals: NutritionGoals;
  createdAt: Date;
  updatedAt: Date;
}

const WeightGoalsSchema = new Schema<WeightGoals>({
  startingWeight: { type: Number, required: true },
  currentWeight: { type: Number, required: true },
  goalWeight: { type: Number, required: true },
});

const NutritionGoalsSchema = new Schema<NutritionGoals>({
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
});

const GoalsSchema = new Schema<UserGoals>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    weightGoals: {
      type: WeightGoalsSchema,
      required: true,
    },
    nutritionGoals: {
      type: NutritionGoalsSchema,
      required: true,
    },
  },
  { timestamps: true },
);

GoalsSchema.index({ userId: 1 }, { unique: true });

const userGoalsModel: Model<UserGoals> =
  mongoose.models.userGoals ||
  mongoose.model<UserGoals>("userGoals", GoalsSchema);

export default userGoalsModel;
