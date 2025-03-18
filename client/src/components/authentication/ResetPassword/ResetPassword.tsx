import { useContext, useEffect } from "react";
import AuthLayout from "../shared/AuthLayout";
import axios from "axios";
import {
  ResetPasswordContext,
  ResetPasswordContextProvider,
} from "../../../context/authentication/ResetPasswordContext";
import EmailForm from "./EmailForm";
import NewPasswordForm from "./NewPasswordForm";
import OtpForm from "./OtpForm";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const { isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

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

  return (
    <ResetPasswordContextProvider>
      <AuthLayout h2="Reset password" content={<ResetPasswordForms />} />
    </ResetPasswordContextProvider>
  );
}
