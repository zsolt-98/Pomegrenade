import { useContext } from "react";
import { useNavigate } from "react-router";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassowrdNewPasswordSchema } from "../schemas/ResetPasswordSchema";
import Input from "../../global/shared/Input";
import { useAuth } from "../hooks/useAuth";

type NewPasswordFormInputs = {
  newPassword: string;
};

export default function NewPasswordForm() {
  const navigate = useNavigate();
  const { email, otp, clearState } = useContext(ResetPasswordContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormInputs>({
    defaultValues: {
      newPassword: "",
    },
    resolver: yupResolver(ResetPassowrdNewPasswordSchema),
  });

  const { onAuth, isSubmitting } = useAuth({
    endpoint: "reset-password",
    onDataSuccess: () => {
      clearState();
      navigate("/login");
    },
    onOtpExpired: clearState,
  });

  return (
    <form
      className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
      noValidate
      onSubmit={handleSubmit((formData) => {
        onAuth({
          email: email,
          otp: otp,
          newPassword: formData.newPassword,
        });
      })}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-tertiary">Enter your desired new password</p>
      </div>

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <Input
            type="password"
            placeholder="New password"
            value={field.value}
            onChange={field.onChange}
            error={errors.newPassword?.message}
          />
        )}
      />
      <div className="flex justify-between gap-2"></div>
      <button
        className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
