import { useContext, useEffect, useRef, useState } from "react";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import { AppContext } from "../../../context/AppContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordOTPSchema } from "../../../schemas/ResetPasswordSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router";
import OtpInput from "../../shared/OtpInput";

type OTPFormInputs = {
  otp: string;
};

export default function OtpForm() {
  const { email, setOtp, setIsOtpSubmitted, clearState } =
    useContext(ResetPasswordContext);
  const { backendUrl } = useContext(AppContext);
  const [isOtpResent, setIsOtpResent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    control,
    handleSubmit,
    reset: resetOtp,
    trigger: triggerOtpValidation,
  } = useForm<OTPFormInputs>({
    resolver: yupResolver(ResetPasswordOTPSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmitOtp = async (formData: OTPFormInputs) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-reset-otp`,
        { email, otp: formData.otp },
      );

      if (data.success) {
        setOtp(formData.otp);
        setIsOtpSubmitted(true);
        toast.success(data.message);
      } else if (
        data.message.toLowerCase().includes("code") &&
        data.message.toLowerCase().includes("expired")
      ) {
        clearState();
        resetOtp();
        toast.error(data.message + ". Please restart the process.");
      } else {
        resetOtp();
        if (inputRefs.current[0]) inputRefs.current[0].focus();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email },
      );
      if (data.success) {
        toast.success(data.message);
        setIsOtpResent(true);
        setTimeLeft(120);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setIsOtpResent(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <form
      className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
      onSubmit={handleSubmit(onSubmitOtp)}
      noValidate
    >
      <p className="text-tertiary">
        Enter the 6-digit code sent to your email address.
      </p>

      <Controller
        name="otp"
        control={control}
        rules={{
          required: "Please enter the verification code",
          pattern: {
            value: /^\d{6}$/,
            message: "Please enter a valid 6-digit code",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <OtpInput
            value={value}
            onChange={onChange}
            error={error?.message}
            onComplete={triggerOtpValidation}
          />
        )}
      />
      <button
        type="submit"
        className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
      >
        Submit
      </button>
      <p className="text-tertiary">
        Didn't receive an email?{" "}
        {!isOtpResent ? (
          <Link
            to="#"
            onClick={handleResendOtp}
            className="outline-tertiary font-semibold underline"
          >
            Resend
          </Link>
        ) : (
          <span>Resend again in {formatTime(timeLeft)}</span>
        )}
      </p>
    </form>
  );
}
