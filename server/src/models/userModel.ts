import mongoose, { Document, Schema, Model } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  verifyOtp?: string;
  lastVerifyOtpSentAt?: number;
  verifyOtpExpireAt?: number;
  isAccountVerified?: boolean;
  resetOtp?: string;
  lastResetOtpSentAt: number;
  resetOtpExpireAt?: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  lastVerifyOtpSentAt: { type: Number, default: 0 },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  lastResetOtpSentAt: { type: Number, default: 0 },
  resetOtpExpireAt: { type: Number, default: 0 },
});

const userModel: Model<User> =
  mongoose.models.user || mongoose.model<User>("user", userSchema);

export default userModel;
