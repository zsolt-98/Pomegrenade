import { useContext, useEffect } from "react";
import AuthLayout from "./shared/AuthLayout";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpSchema } from "./schemas/ResetPasswordSchema";
import useResendTimer from "./hooks/useResendOtpTimer";
import OtpVerificationFormLayout from "./shared/OtpVerificationFormLayout";
import { useResendOtp } from "./hooks/useResendOtp";
import { useAuth } from "./hooks/useAuth";
import { ResetPasswordContext } from "../../context/authentication/ResetPasswordContext";

type VerifyEmailFormInputs = {
  otp: string;
};

export default function VerifyEmail() {
  axios.defaults.withCredentials = true;
  const { email } = useContext(ResetPasswordContext);
  const { isLoggedin, userData, getUserData } = useContext(AppContext);
  const { isResendDisabled, timeLeft, startTimer, formatTime } =
    useResendTimer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

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

  const { onAuth } = useAuth({
    endpoint: "verify-account",
    onDataSuccess: () => {
      getUserData();
      navigate("/");
    },
    resetOtp,
  });

  const { handleResendOtp, isResending } = useResendOtp({
    endpoint: "send-verify-otp",
    startTimer,
  });

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <AuthLayout
      h2="Verify your email"
      content={
        <OtpVerificationFormLayout
          onSubmit={handleSubmit((formData) => {
            onAuth({
              email: email,
              otp: formData.otp,
            });
          })}
          control={control}
          triggerOtpValidation={triggerOtpValidation}
          isResendDisabled={isResendDisabled}
          handleResendOtp={handleResendOtp}
          formatTime={formatTime}
          timeLeft={timeLeft}
          isResending={isResending}
        />
      }
    />
  );
}
