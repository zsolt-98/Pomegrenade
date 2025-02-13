import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(20, "Name can't be longer than 20 characters"),

  email: yup
    .string()
    .required()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address",
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
