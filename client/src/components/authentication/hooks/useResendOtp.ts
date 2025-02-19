import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/AppContext";

type UseResendOtpProps = {
  endpoint: string;
  email?: string;
  startTimer: () => void;
};

export const useResendOtp = ({
  endpoint,
  email,
  startTimer,
}: UseResendOtpProps) => {
  const { backendUrl } = useContext(AppContext);

  const handleResendOtp = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const payload = endpoint === "send-reset-otp" ? { email } : {};

      const { data } = await axios.post(
        `${backendUrl}/api/auth/${endpoint}`,
        payload,
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

  return { handleResendOtp };
};
