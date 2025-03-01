import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addFoodEntry,
  getUserFoodEntries,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post("/add", userAuth, addFoodEntry);
foodRouter.get("/entries", userAuth, getUserFoodEntries);

export default foodRouter;
