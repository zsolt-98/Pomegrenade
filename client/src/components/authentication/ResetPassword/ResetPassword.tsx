import { useContext, useEffect } from "react";
import AuthLayout from "../shared/AuthLayout";
import axios from "axios";
import { ResetPasswordContext } from "../../../context/authentication/ResetPasswordContext";
import EmailForm from "./EmailForm";
import NewPasswordForm from "./NewPasswordForm";
import OtpForm from "./OtpForm";
import { AppContext } from "@/context/AppContext";

export default function ResetPassword() {
  const { isLoggedin, userData } = useContext(AppContext);
  const { setIsEmailSent, setEmail } = useContext(ResetPasswordContext);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (isLoggedin && userData) {
      setEmail(userData.email);
      setIsEmailSent(true);
    }
  }, [isLoggedin, userData, setEmail, setIsEmailSent]);

  function ResetPasswordForms() {
    const { isEmailSent, isOtpSubmitted } = useContext(ResetPasswordContext);

    return (
      <>
        {!isEmailSent && <EmailForm />}
        {!isOtpSubmitted && isEmailSent && <OtpForm />}
        {isOtpSubmitted && isEmailSent && <NewPasswordForm />}
      </>
    );
  }

  return <AuthLayout h2="Reset password" content={<ResetPasswordForms />} />;
}
