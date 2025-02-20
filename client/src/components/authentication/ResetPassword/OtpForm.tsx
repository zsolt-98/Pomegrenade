import { useContext } from "react";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpSchema } from "../schemas/ResetPasswordSchema";
import useResendTimer from "../hooks/useResendOtpTimer";
import OtpVerificationFormLayout from "../shared/OtpVerificationFormLayout";
import { OTPFormInputs } from "../../../types";
import { useResendOtp } from "../hooks/useResendOtp";
import { useAuth } from "../hooks/useAuth";

export default function OtpForm() {
  const { email, setOtp, setIsOtpSubmitted, clearState } =
    useContext(ResetPasswordContext);
  const { isResendDisabled, timeLeft, startTimer, formatTime } =
    useResendTimer();

  const {
    control,
    handleSubmit,
    reset: resetOtp,
    trigger: triggerOtpValidation,
  } = useForm<OTPFormInputs>({
    resolver: yupResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const { onAuth } = useAuth({
    endpoint: "verify-reset-otp",
    onDataSuccess: (_, formInputData) => {
      setOtp(formInputData.otp as string);
      setIsOtpSubmitted(true);
    },
    resetOtp,
    onOtpExpired: clearState,
  });

  const { handleResendOtp, isResending } = useResendOtp({
    endpoint: "send-reset-otp",
    email,
    startTimer,
  });

  return (
    <OtpVerificationFormLayout
      onSubmit={handleSubmit((formData) => {
        onAuth({
          otp: formData.otp,
          email: email,
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
  );
}
