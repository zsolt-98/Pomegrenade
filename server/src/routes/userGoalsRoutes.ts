import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserGoals } from "../controllers/userGoalsController.js";

const userGoalsRouter = express.Router();

userGoalsRouter.get("/get", userAuth, getUserGoals);

export default userGoalsRouter;
