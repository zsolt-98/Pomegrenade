import { Request, Response } from "express";
import foodModel from "../models/foodModel.js";

export const addFoodEntry = async (req: Request, res: Response) => {
  const {
    userId,
    food_id,
    food_name,
    food_description,
    servingSize,
    servings,
  } = req.body;

  if (
    !userId ||
    !food_id ||
    !food_name ||
    !food_description ||
    !servingSize ||
    !servings
  ) {
    return res.json({ success: false, message: "Missing food entry details" });
  }

  try {
    const newFoodEntry = new foodModel({
      userId,
      food_id,
      food_name,
      food_description,
      servingSize,
      servings,
    });

    await newFoodEntry.save();

    return res.json({
      success: true,
      message: "Food added successfully",
      foodEntry: newFoodEntry,
    });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};

export const getUserFoodEntries = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const entries = await foodModel.find({ userId }).sort({ addedAt: -1 });

    return res.json({
      success: true,
      foodEntries: entries,
    });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};
