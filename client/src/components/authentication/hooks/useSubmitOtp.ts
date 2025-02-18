import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { UseFormReset } from "react-hook-form";
import { OTPFormInputs } from "../../../types";

type OtpApiResponse = {
  success: boolean;
  message: string;
};

type UseSubmitOtpProps = {
  endpoint: string;
  email?: string;
  resetOtp: UseFormReset<OTPFormInputs>;
  onSuccess: (data: OtpApiResponse) => void;
  onExpired?: () => void;
};

export function useSubmitOtp({
  endpoint,
  email,
  resetOtp,
  onSuccess,
  onExpired,
}: UseSubmitOtpProps) {
  const { backendUrl } = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOtp = async (formData: OTPFormInputs) => {
    setIsSubmitting(true);
    try {
      const payload = email
        ? { email, otp: formData.otp }
        : {
            otp: formData.otp,
          };

      const { data } = await axios.post(
        `${backendUrl}/api/auth/${endpoint}`,
        payload,
      );

      if (data.success) {
        onSuccess(data);
        toast.success(data.message);
      } else if (
        data.message.toLowerCase().includes("code") &&
        data.message.toLowerCase().includes("expired")
      ) {
        if (onExpired) {
          onExpired();
        }
        resetOtp();
        toast.error(data.message + ". Please restart the process.");
      } else {
        resetOtp();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    submitOtp,
    isSubmitting,
  };
}
