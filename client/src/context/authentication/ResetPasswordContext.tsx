/* eslint-disable */ // temporary

import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ResetPasswordContextType {
  email: string;
  setEmail: (email: string) => void;
  isEmailSent: boolean;
  setIsEmailSent: (value: boolean) => void;
  otp: string;
  setOtp: (value: string) => void;
  isOtpSubmitted: boolean;
  setIsOtpSubmitted: (value: boolean) => void;
  clearState: () => void;
}

const defaultContextValue: ResetPasswordContextType = {
  email: "",
  setEmail: () => {},
  isEmailSent: false,
  setIsEmailSent: () => {},
  otp: "",
  setOtp: () => {},
  isOtpSubmitted: false,
  setIsOtpSubmitted: () => {},
  clearState: () => {},
};

export const ResetPasswordContext =
  createContext<ResetPasswordContextType>(defaultContextValue);

export const ResetPasswordContextProvider = ({
  children,
}: PropsWithChildren) => {
  const getInitialState = () => {
    const savedState = localStorage.getItem("resetPasswordState");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      email: "",
      isEmailSent: false,
      isOtpSubmitted: false,
      otp: "",
    };
  };

  const [email, setEmail] = useState(getInitialState().email);
  const [isEmailSent, setIsEmailSent] = useState(getInitialState().isEmailSent);
  const [otp, setOtp] = useState(getInitialState().otp);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(
    getInitialState().isOtpSubmitted,
  );

  useEffect(() => {
    const stateToSave = {
      email,
      isEmailSent,
      isOtpSubmitted,
      otp,
    };
    localStorage.setItem("resetPasswordState", JSON.stringify(stateToSave));
  }, [email, isEmailSent, isOtpSubmitted, otp]);

  const clearState = () => {
    localStorage.removeItem("resetPasswordState");
    setEmail("");
    setIsEmailSent(false);
    setOtp("");
    setIsOtpSubmitted(false);
  };

  const value = {
    email,
    setEmail,
    isEmailSent,
    setIsEmailSent,
    otp,
    setOtp,
    isOtpSubmitted,
    setIsOtpSubmitted,
    clearState,
  };

  return (
    <ResetPasswordContext.Provider value={value}>
      {children}
    </ResetPasswordContext.Provider>
  );
};
