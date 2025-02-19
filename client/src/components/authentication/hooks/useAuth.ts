import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

type AuthApiResponse = {
  success: boolean;
  message: string;
};

type UseAuthProps = {
  endpoint: string;
  onDataSuccess: (data: AuthApiResponse) => void;
  onDataFail?: () => void;
};

export type AuthFormInputs = {
  email: string;
  name?: string;
  otp?: string;
  password?: string;
};

export function useAuth({ endpoint, onDataSuccess, onDataFail }: UseAuthProps) {
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
        onDataSuccess(data);
      } else {
        toast.error(data.message);
      }
      // else if (onDataFail) {
      //   onDataFail(); }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onAuth };
}
