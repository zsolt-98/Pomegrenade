import { useContext } from "react";
import AuthLayout from "../AuthLayout";
import axios from "axios";
import {
  ResetPasswordContext,
  ResetPasswordContextProvider,
} from "../../../context/authentication/ResetPasswordContext";
import EmailForm from "./EmailForm";
import NewPasswordForm from "./NewPasswordForm";
import OtpForm from "./OtpForm";

export default function ResetPassword() {
  axios.defaults.withCredentials = true;

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
