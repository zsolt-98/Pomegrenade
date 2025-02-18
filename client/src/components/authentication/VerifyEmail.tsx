import { useContext, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpSchema } from "../../schemas/ResetPasswordSchema";
import useResendTimer from "../../hooks/useResendOtpTimer";
import OtpVerificationFormLayout from "./shared/OtpVerificationFormLayout";

type VerifyEmailFormInputs = {
  otp: string;
};

export default function VerifyEmail() {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);
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

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  const onSubmitOtp = async (formData: VerifyEmailFormInputs) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp: formData.otp },
      );
      if (data.success) {
        getUserData();
        navigate("/");
        toast.success(data.message);
      } else if (
        data.message.toLowerCase().includes("code") &&
        data.message.toLowerCase().includes("expired")
      ) {
        resetOtp();
        toast.error(data.message + ". Please restart the process.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    }
  };

  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
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
    <AuthLayout
      h2="Verify your email"
      content={
        <OtpVerificationFormLayout
          onSubmit={handleSubmit(onSubmitOtp)}
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
