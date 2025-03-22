import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getProfilePhoto,
  getUserData,
  uploadProfilePhoto,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

userRouter.post("/profile-photo", userAuth, uploadProfilePhoto);
userRouter.get("/profile-photo", userAuth, getProfilePhoto);

export default userRouter;
