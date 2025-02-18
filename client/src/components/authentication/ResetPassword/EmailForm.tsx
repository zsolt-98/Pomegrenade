import { useContext } from "react";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import { AppContext } from "../../../context/AppContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ResetPasswordEmailSchema } from "../../../schemas/ResetPasswordSchema";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../shared/Input";

type EmailFormInputs = {
  email: string;
};

export default function EmailForm() {
  const { setEmail, setIsEmailSent } = useContext(ResetPasswordContext);
  const { backendUrl } = useContext(AppContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInputs>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(ResetPasswordEmailSchema),
  });

  const onSubmitEmail = async (formData: EmailFormInputs) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email: formData.email },
      );
      if (data.success) {
        setEmail(formData.email);
        setIsEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  return (
    <form
      className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
      onSubmit={handleSubmit(onSubmitEmail)}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-tertiary">
          Enter your email address to receive a 6-digit verification code for
          password reset.
        </p>
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            placeholder="Email address"
            value={field.value}
            onChange={field.onChange}
            error={errors.email?.message}
          />
        )}
      />

      <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light o outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
        Submit
      </button>
    </form>
  );
}
