import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "../../config/emailTemplates.js";

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      domain:
        process.env.NODE_ENV === "production" ? ".pomegrenade.xyz" : undefined,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // Send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Pomegrenade",
      html: WELCOME_EMAIL_TEMPLATE,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Successful registration" });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email adress" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      domain:
        process.env.NODE_ENV === "production" ? ".pomegrenade.xyz" : undefined,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({ success: true, message: "Successful log in" });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      domain:
        process.env.NODE_ENV === "production" ? ".pomegrenade.xyz" : undefined,
      path: "/",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

// Send verification OTP to the user's email address
export const sendVerifyOtp = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "The account is already verified",
      });
    }

    const lastOtpSentAt = user.lastVerifyOtpSentAt || 0;
    const now = Date.now();
    const timeSinceLastOtp = now - lastOtpSentAt;

    if (timeSinceLastOtp < 5000) {
      return res.json({
        success: false,
        message: `Please wait ${Math.ceil((5000 - timeSinceLastOtp) / 1000)} seconds before requesting another verification code`,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    user.lastVerifyOtpSentAt = now;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      // text: `Your OTP is ${otp}. Verify your account using this OTP.`,
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email,
      ),
    };

    await transporter.sendMail(mailOption);

    res.json({
      success: true,
      message: "6-digit verification code sent to your email address",
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid verification code" });
    }

    if (user.verifyOtpExpireAt && user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const isAuthenticated = async (req: Request, res: Response) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

// Send password reset OTP
export const sendResetOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "No user found under this email address",
      });
    }

    const lastOtpSentAt = user.lastResetOtpSentAt || 0;
    const now = Date.now();
    const timeSinceLastOtp = now - lastOtpSentAt;

    if (timeSinceLastOtp < 5000) {
      return res.json({
        success: false,
        message: `Please wait ${Math.ceil((5000 - timeSinceLastOtp) / 1000)} seconds before requesting another verification code`,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    user.lastResetOtpSentAt = now;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email,
      ),
    };

    await transporter.sendMail(mailOption);
    return res.json({
      success: true,
      message: "6-digit verification code sent to your email address",
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export const verifyResetOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({
      success: false,
      message: "Email and 6-digit verification code are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtpExpireAt && user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid verification code" });
    }

    return res.json({ success: true, message: "Code verification successful" });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

// Reset user password
export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  if (!newPassword) {
    return res.json({
      success: false,
      message: "New password is required.",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!otp) {
      return res.json({ success: false, message: "Verification failed" });
    }

    if (user.resetOtpExpireAt && user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Verification code expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};
