import * as yup from "yup";

export const ResetPasswordEmailSchema = yup.object({
  email: yup
    .string()
    .required("Email address is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address",
    ),
});

export const ResetPasswordOTPSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d+$/, "OTP must contain only numbers")
    .length(6, "OTP must be exactly 6 digits"),
});

export const ResetPassowrdNewPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const verifyOtpSchema = yup.object({
  otp: yup
    .string()
    .required("Please enter the verification code")
    .matches(/^\d{6}$/, "Please enter a valid 6-digit code"),
});

export type VerifyOrResetPasswordOtpFormData = yup.InferType<
  typeof ResetPasswordEmailSchema
>;
