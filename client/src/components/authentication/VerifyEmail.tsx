import { useContext, useEffect, useState } from "react";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpSchema } from "../../schemas/ResetPasswordSchema";
import OtpInput from "../shared/OtpInput";

type VerifyEmailFormInputs = {
  otp: string;
};

export default function VerifyEmail() {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [isOtpResent, setIsOtpResent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const {
    control,
    handleSubmit,
    reset: resetOtp,
    trigger: triggerOtpValidation,
  } = useForm<VerifyEmailFormInputs>({
    resolver: yupResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

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

  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
      );
      if (data.success) {
        toast.success(data.message);
        setIsOtpResent(true);
        setTimeLeft(120); // 2 minutes countdown
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  const onSubmitOtp = async (formData: VerifyEmailFormInputs) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp: formData.otp },
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else if (
        data.message.toLowerCase().includes("code") &&
        data.message.toLowerCase().includes("expired")
      ) {
        resetOtp();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    }
  };

  return (
    <AuthLayout
      h2="Verify your email"
      content={
        <form
          className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
          onSubmit={handleSubmit(onSubmitOtp)}
          noValidate
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-tertiary">
              Enter the 6-digit code sent to your email address.
            </p>
          </div>

          <Controller
            name="otp"
            control={control}
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
            className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
          >
            Verify email
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
      }
    />
  );
}
