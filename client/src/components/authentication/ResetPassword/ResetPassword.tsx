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
  const { isEmailSent, isOtpSubmitted } = useContext(ResetPasswordContext);
  axios.defaults.withCredentials = true;

  return (
    <ResetPasswordContextProvider>
      <AuthLayout
        h2="Reset password"
        content={
          <>
            {!isEmailSent && <EmailForm />}

            {!isOtpSubmitted && isEmailSent && <OtpForm />}

            {isOtpSubmitted && isEmailSent && <NewPasswordForm />}
          </>
        }
      />
    </ResetPasswordContextProvider>
  );
}
