import userModel from "../models/userModel.js";
import { Request, Response } from "express";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const uploadProfilePhoto = async (req: Request, res: Response) => {
  try {
    const { image, fileType } = req.body;
    const { userId } = req.body;

    if (!image) {
      return res.json({ success: false, message: "No image data provided" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.profilePhoto = {
      data: image,
      contentType: fileType,
    };

    await user.save();

    return res.json({
      success: true,
      message: "Profile photo uploaded successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const getProfilePhoto = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profilePhoto || !user.profilePhoto.data) {
      return res.json({
        success: false,
        message: "No profile photo found",
      });
    }

    return res.json({
      success: true,
      profilePhoto: user.profilePhoto.data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updatePersonalInfo = async (req: Request, res: Response) => {
  try {
    const { userId, name, email } = req.body;

    if (!name) {
      return res.json({ success: false, message: "Name is required" });
    }

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.name === name && user.email === email) {
      return res.json({
        success: false,
        message: "No changes detected",
      });
    }

    user.name = name;
    user.email = email;
    await user.save();

    return res.json({
      success: true,
      message: "Personal information updated successfully",
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: (error as Error).message,
    });
  }
};
