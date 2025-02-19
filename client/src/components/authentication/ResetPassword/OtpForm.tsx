import { useContext } from "react";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import { AppContext } from "../../../context/AppContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpSchema } from "../../../schemas/ResetPasswordSchema";
import axios from "axios";
import { toast } from "react-toastify";

import useResendTimer from "../../../hooks/useResendOtpTimer";
import OtpVerificationFormLayout from "../shared/OtpVerificationFormLayout";
import { useSubmitOtp } from "../hooks/useSubmitOtp";
import { OTPFormInputs } from "../../../types";
import { useResendOtp } from "../hooks/useResendOtp";

export default function OtpForm() {
  const { email, setOtp, setIsOtpSubmitted, clearState } =
    useContext(ResetPasswordContext);
  const { backendUrl } = useContext(AppContext);
  const { isResendDisabled, timeLeft, startTimer, formatTime } =
    useResendTimer();

  const {
    control,
    handleSubmit,
    reset: resetOtp,
    trigger: triggerOtpValidation,
    watch,
  } = useForm<OTPFormInputs>({
    resolver: yupResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const currentOtp = watch("otp");
  const { submitOtp } = useSubmitOtp({
    endpoint: "verify-reset-otp",
    email,
    resetOtp,
    onSuccess: () => {
      setOtp(currentOtp);
      setIsOtpSubmitted(true);
    },
    onExpired: clearState,
  });

  const { handleResendOtp } = useResendOtp({
    endpoint: "send-reset-otp",
    email,
    startTimer,
  });

  return (
    <OtpVerificationFormLayout
      onSubmit={handleSubmit(submitOtp)}
      control={control}
      triggerOtpValidation={triggerOtpValidation}
      isResendDisabled={isResendDisabled}
      handleResendOtp={handleResendOtp}
      formatTime={formatTime}
      timeLeft={timeLeft}
    />
  );
}
