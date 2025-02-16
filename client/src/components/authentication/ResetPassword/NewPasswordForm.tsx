import { useContext } from "react";
import { useNavigate } from "react-router";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import { AppContext } from "../../../context/AppContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassowrdNewPasswordSchema } from "../../../schemas/ResetPasswordSchema";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../shared/Input";

type NewPasswordFormInputs = {
  newPassword: string;
};

export default function NewPasswordForm() {
  const navigate = useNavigate();
  const { email, otp, clearState } = useContext(ResetPasswordContext);
  const { backendUrl } = useContext(AppContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormInputs>({
    resolver: yupResolver(ResetPassowrdNewPasswordSchema),
  });

  const onSubmitNewPassowrd = async (formData: NewPasswordFormInputs) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { email, otp, newPassword: formData.newPassword },
      );
      if (data.success) {
        toast.success(data.message);
        clearState();
        navigate("/login");
      } else {
        if (
          data.message.toLowerCase().includes("code") &&
          data.message.toLowerCase().includes("expired")
        ) {
          clearState();
          toast.error(data.message + ". Please restart the process.");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  return (
    <form
      className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
      onSubmit={handleSubmit(onSubmitNewPassowrd)}
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
      <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
        Submit
      </button>
    </form>
  );
}
