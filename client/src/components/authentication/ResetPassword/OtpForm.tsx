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

type OTPFormInputs = {
  otp: string;
};

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
  } = useForm<OTPFormInputs>({
    resolver: yupResolver(verifyOtpSchema),
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
        startTimer();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  return (
    <OtpVerificationFormLayout
      onSubmit={handleSubmit(onSubmitOtp)}
      control={control}
      triggerOtpValidation={triggerOtpValidation}
      isResendDisabled={isResendDisabled}
      handleResendOtp={handleResendOtp}
      formatTime={formatTime}
      timeLeft={timeLeft}
    />
  );
}
