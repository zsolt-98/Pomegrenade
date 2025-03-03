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

  // TODO: Change sorting
  try {
    const entries = await foodModel.find({ userId }).sort({ addedAt: 1 });

    if (!entries) {
      return res.json({
        success: false,
        message: "An error has ocured while fetching your entries",
      });
    }

    return res.json({
      success: true,
      foodEntries: entries,
    });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};

export const deleteFoodEntry = async (req: Request, res: Response) => {
  const { userId, entryId } = req.body;

  if (!entryId) {
    return res.json({
      success: false,
      message: "Food entry not found",
    });
  }

  if (!userId) {
    return res.json({
      success: false,
      message: "You are not authorized to delete this entry",
    });
  }

  try {
    const entry = await foodModel.findOne({ _id: entryId, userId });

    if (!entry) {
      return res.json({
        success: false,
        message:
          "Food entry not found or you don't have permission to delete it",
      });
    }

    await foodModel.findByIdAndDelete(entryId);

    return res.json({
      success: true,
      message: "Food entry deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};
