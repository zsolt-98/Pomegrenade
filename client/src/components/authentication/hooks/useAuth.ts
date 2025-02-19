import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { UseFormReset } from "react-hook-form";
import { OTPFormInputs } from "../../../types";

// TODO: Add OTP expired reset to Email Verification

type AuthApiResponse = {
  success: boolean;
  message: string;
};

type UseAuthProps = {
  endpoint: string;
  onDataSuccess: (data: AuthApiResponse, formInputData: AuthFormInputs) => void;
  resetOtp?: UseFormReset<OTPFormInputs>;
  onOtpExpired?: () => void;
  onDataFail?: () => void;
};

export type AuthFormInputs = {
  email: string;
  name?: string;
  otp?: string;
  password?: string;
  newPassword?: string;
};

export function useAuth({
  endpoint,
  onDataSuccess,
  resetOtp,
  onOtpExpired,
}: UseAuthProps) {
  const { backendUrl } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onAuth = async (formData: AuthFormInputs) => {
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/${endpoint}`,
        formData,
      );

      if (data.success) {
        toast.success(data.message);
        onDataSuccess(data, formData);
      } else if (
        data.message.toLowerCase().includes("code") &&
        data.message.toLowerCase().includes("expired")
      ) {
        if (onOtpExpired) {
          onOtpExpired();
        }
        if (resetOtp) {
          resetOtp();
        }
        toast.error(data.message + ". Please restart the process.");
      } else {
        toast.error(data.message);
        if (resetOtp) {
          resetOtp();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onAuth };
}
