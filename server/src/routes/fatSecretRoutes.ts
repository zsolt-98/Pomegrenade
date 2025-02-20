import express from "express";
import { searchFoods } from "../controllers/fatSecretController.js";

const fatSecretRouter = express.Router();

fatSecretRouter.get("/foods.search", searchFoods);

export default fatSecretRouter;
