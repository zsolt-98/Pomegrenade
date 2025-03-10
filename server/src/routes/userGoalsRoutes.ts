import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserGoals,
  updateNutritionGoals,
  updateWeightGoals,
} from "../controllers/userGoalsController.js";

const userGoalsRouter = express.Router();

userGoalsRouter.get("/get", userAuth, getUserGoals);
userGoalsRouter.put("/weight", userAuth, updateWeightGoals);
userGoalsRouter.put("/nutrition", userAuth, updateNutritionGoals);

export default userGoalsRouter;
