import { Request, Response } from "express";
import userGoalsModel from "../models/userGoalsModel.js";

export const getUserGoals = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    if (!userId) {
      return res.json({
        success: false,
        message: "Not authenticated",
      });
    }

    let userGoals = await userGoalsModel.findOne({ userId });

    if (!userGoals) {
      userGoals = await userGoalsModel.create({
        userId,
        weightGoals: {
          startingWeight: 0,
          currentWeight: 0,
          goalWeight: 0,
          weeklyGoal: "0",
        },
        nutritionGoals: {
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
        },
      });
    }

    const formattedGoals = {
      weightGoals: {
        title: "Weight Goals",
        labels: [
          "Starting weight",
          "Current weight",
          "Goal weight",
          "Weekly goal",
        ],
        values: [
          `${userGoals.weightGoals.startingWeight} kg`,
          `${userGoals.weightGoals.currentWeight} kg`,
          `${userGoals.weightGoals.goalWeight} kg`,
          userGoals.weightGoals.weeklyGoal,
        ],
        rawValues: {
          startingWeight: userGoals.weightGoals.startingWeight,
          currentWeight: userGoals.weightGoals.currentWeight,
          goalWeight: userGoals.weightGoals.goalWeight,
          weeklyGoal: userGoals.weightGoals.weeklyGoal,
        },
      },
      nutritionGoals: {
        title: "Nutrition Goals",
        labels: ["Calories", "Carbohydrates", "Protein", "Fat"],
        values: [
          `${userGoals.nutritionGoals.calories}`,
          `${userGoals.nutritionGoals.carbohydrates}g`,
          `${userGoals.nutritionGoals.protein}g`,
          `${userGoals.nutritionGoals.fat}g`,
        ],
        rawValues: {
          calories: userGoals.nutritionGoals.calories,
          carbohydrates: userGoals.nutritionGoals.carbohydrates,
          protein: userGoals.nutritionGoals.protein,
          fat: userGoals.nutritionGoals.fat,
        },
      },
    };

    return res.json({ success: true, data: formattedGoals });
  } catch (error) {
    console.error("Error fetching user goals:", error);
    return res.json({
      success: false,
      message: "Failed to fetch goals data",
    });
  }
};
