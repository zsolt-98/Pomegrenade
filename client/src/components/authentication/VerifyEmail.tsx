import { useContext, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpSchema } from "../../schemas/ResetPasswordSchema";
import useResendTimer from "../../hooks/useResendOtpTimer";
import OtpVerificationFormLayout from "./shared/OtpVerificationFormLayout";
import { useSubmitOtp } from "./hooks/useSubmitOtp";
import { useResendOtp } from "./hooks/useResendOtp";

type VerifyEmailFormInputs = {
  otp: string;
};

export default function VerifyEmail() {
  axios.defaults.withCredentials = true;
  const { isLoggedin, userData, getUserData } = useContext(AppContext);
  const { isResendDisabled, timeLeft, startTimer, formatTime } =
    useResendTimer();
  const navigate = useNavigate();

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

  const { submitOtp } = useSubmitOtp({
    endpoint: "verify-account",
    resetOtp,
    onSuccess: () => {
      getUserData();
      navigate("/");
    },
  });

  const { handleResendOtp } = useResendOtp({
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
          onSubmit={handleSubmit(submitOtp)}
          control={control}
          triggerOtpValidation={triggerOtpValidation}
          isResendDisabled={isResendDisabled}
          handleResendOtp={handleResendOtp}
          formatTime={formatTime}
          timeLeft={timeLeft}
        />
      }
    />
  );
}
