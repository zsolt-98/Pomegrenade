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
        labels: ["Starting weight", "Current weight", "Goal weight"],
        values: [
          `${userGoals.weightGoals.startingWeight} kg`,
          `${userGoals.weightGoals.currentWeight} kg`,
          `${userGoals.weightGoals.goalWeight} kg`,
        ],
        rawValues: {
          startingWeight: userGoals.weightGoals.startingWeight,
          currentWeight: userGoals.weightGoals.currentWeight,
          goalWeight: userGoals.weightGoals.goalWeight,
        },
      },
      nutritionGoals: {
        title: "Nutrition Goals",
        labels: ["Calories", "Carbohydrates", "Protein", "Fat"],
        values: [
          `${userGoals.nutritionGoals.calories} cal`,
          `${userGoals.nutritionGoals.carbohydrates} g`,
          `${userGoals.nutritionGoals.protein} g`,
          `${userGoals.nutritionGoals.fat} g`,
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

export const updateWeightGoals = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { startingWeight, currentWeight, goalWeight } = req.body;

  try {
    if (!userId) {
      return res.json({
        success: false,
        message: "Not authenticated",
      });
    }

    let userGoals = await userGoalsModel.findOne({ userId });

    if (!userGoals) {
      return res.json({
        success: false,
        message: "User goals not found",
      });
    }

    userGoals.weightGoals.startingWeight = startingWeight;
    userGoals.weightGoals.currentWeight = currentWeight;
    userGoals.weightGoals.goalWeight = goalWeight;

    await userGoals.save();

    const updatedGoals = {
      weightGoals: {
        title: "Weight Goals",
        labels: ["Starting weight", "Current weight", "Goal weight"],
        values: [
          `${userGoals.weightGoals.startingWeight} kg`,
          `${userGoals.weightGoals.currentWeight} kg`,
          `${userGoals.weightGoals.goalWeight} kg`,
        ],
        rawValues: {
          startingWeight: userGoals.weightGoals.startingWeight,
          currentWeight: userGoals.weightGoals.currentWeight,
          goalWeight: userGoals.weightGoals.goalWeight,
        },
      },
    };

    return res.json({ success: true, data: updatedGoals });
  } catch (error) {
    console.error("Error updating weight goals:", error);
    return res.json({
      success: false,
      message: "Failed to update weight goals",
    });
  }
};

export const updateNutritionGoals = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const { calories, carbohydrates, protein, fat } = req.body;

  try {
    if (!userId) {
      return res.json({
        success: false,
        message: "Not authenticated",
      });
    }

    let userGoals = await userGoalsModel.findOne({ userId });

    if (!userGoals) {
      return res.json({
        success: false,
        message: "User goals not found",
      });
    }

    userGoals.nutritionGoals.calories = calories;
    userGoals.nutritionGoals.carbohydrates = carbohydrates;
    userGoals.nutritionGoals.protein = protein;
    userGoals.nutritionGoals.fat = fat;

    await userGoals.save();

    const updatedGoals = {
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
    return res.json({ success: true, data: updatedGoals });
  } catch (error) {
    console.error("Error updating nutrition goals:", error);
    return res.json({
      success: false,
      message: "Failed to update nutrition goals",
    });
  }
};
