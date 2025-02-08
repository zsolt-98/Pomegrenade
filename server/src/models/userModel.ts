import mongoose, { Document, Schema, Model } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  verifyOtp?: string;
  verifyOtpExpireAt?: number;
  isAccountVerified?: boolean;
  resetOtp?: string;
  resetOtpExpireAt?: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});

const userModel: Model<User> =
  mongoose.models.user || mongoose.model<User>("user", userSchema);

export default userModel;
