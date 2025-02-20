import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router";

type UseResendOtpProps = {
  endpoint: string;
  email?: string;
  startTimer?: () => void;
};

export const useResendOtp = ({
  endpoint,
  email,
  startTimer,
}: UseResendOtpProps) => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isResending) return;
    setIsResending(true);
    try {
      const payload = endpoint === "send-reset-otp" ? { email } : {};

      const { data } = await axios.post(
        `${backendUrl}/api/auth/${endpoint}`,
        payload,
      );

      if (data.success) {
        toast.success(data.message);
        if (startTimer) {
          startTimer();
        }
        if (endpoint === "send-verify-otp") {
          navigate("/email-verify");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    } finally {
      setIsResending(false);
    }
  };

  return { handleResendOtp, isResending };
};
