import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addFoodEntry,
  deleteFoodEntry,
  getUserFoodEntries,
  updateFoodEntry,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post("/add", userAuth, addFoodEntry);
foodRouter.get("/entries", userAuth, getUserFoodEntries);
foodRouter.delete("/delete", userAuth, deleteFoodEntry);
foodRouter.put("/update", userAuth, updateFoodEntry);

export default foodRouter;
