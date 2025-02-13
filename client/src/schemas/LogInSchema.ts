import * as yup from "yup";

export const LogInSchema = yup.object({
  email: yup
    .string()
    .required("Email address is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address",
    ),

  password: yup.string().required("Password is required"),
});

export type LogInFormData = yup.InferType<typeof LogInSchema>;
