import * as yup from "yup";

export const updatePersonalInfoSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(20, "Name can't be longer than 20 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

  email: yup
    .string()
    .required("Email adress is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address",
    ),
});

export type UpdatePersonalInfoFormData = yup.InferType<
  typeof updatePersonalInfoSchema
>;
