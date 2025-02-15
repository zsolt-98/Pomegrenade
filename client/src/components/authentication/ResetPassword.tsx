import { useContext, useEffect, useRef, useState } from "react";
import Input from "../shared/Input";
import AuthLayout from "./AuthLayout";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ResetPassowrdNewPasswordSchema,
  ResetPasswordEmailSchema,
  ResetPasswordOTPSchema,
} from "../../schemas/ResetPasswordSchema";

interface EmailFormInputs {
  email: string;
}

interface OTPFormInputs {
  otp: string;
}

interface NewPasswordFormInputs {
  newPassword: string;
}

type ResetPasswordState = {
  email: string;
  isEmailSent: boolean;
  isOtpSubmitted: boolean;
  otp: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const getInitialState = (): ResetPasswordState => {
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
  const [isOtpResent, setIsOtpResent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormInputs>({
    resolver: yupResolver(ResetPasswordEmailSchema),
  });

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    reset: resetOtp,
    trigger: triggerOtpValidation,
  } = useForm<OTPFormInputs>({
    resolver: yupResolver(ResetPasswordOTPSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const {
    control: newPasswordControl,
    handleSubmit: handleNewPasswordSubmit,
    formState: { errors: newPasswordErrors },
  } = useForm<NewPasswordFormInputs>({
    resolver: yupResolver(ResetPassowrdNewPasswordSchema),
  });

  useEffect(() => {
    const stateToSave: ResetPasswordState = {
      email,
      isEmailSent,
      isOtpSubmitted,
      otp,
    };
    localStorage.setItem("resetPasswordState", JSON.stringify(stateToSave));
  }, [email, isEmailSent, isOtpSubmitted, otp]);

  const clearPersistedState = () => {
    localStorage.removeItem("resetPasswordState");
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      event.key === "Backspace" &&
      event.currentTarget.value === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const paste = event.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (formData: EmailFormInputs) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email: formData.email },
      );
      if (data.success) {
        setEmail(formData.email);
        setIsEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  const onSubmitOtp = async (formData: OTPFormInputs) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-reset-otp`,
        { email, otp: formData.otp },
      );

      if (data.success) {
        setOtp(formData.otp);
        setIsOtpSubmitted(true);
        toast.success(data.message);
      } else if (
        data.message.toLowerCase().includes("code") &&
        data.message.toLowerCase().includes("expired")
      ) {
        clearPersistedState();
        setEmail("");
        setIsEmailSent(false);
        setIsOtpSubmitted(false);
        setOtp("");
        resetOtp();
        toast.error(data.message + ". Please restart the process.");
      } else {
        resetOtp();
        if (inputRefs.current[0]) inputRefs.current[0].focus();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email },
      );
      if (data.success) {
        toast.success(data.message);
        setIsOtpResent(true);
        setTimeLeft(120);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setIsOtpResent(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onSubmitNewPassowrd = async (formData: NewPasswordFormInputs) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { email, otp, newPassword: formData.newPassword },
      );
      if (data.success) {
        toast.success(data.message);
        clearPersistedState();
        navigate("/login");
      } else {
        if (
          data.message.toLowerCase().includes("code") &&
          data.message.toLowerCase().includes("expired")
        ) {
          clearPersistedState();
          setEmail("");
          setIsEmailSent(false);
          setIsOtpSubmitted(false);
          setOtp("");
          toast.error(data.message + ". Please restart the process.");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  return (
    <AuthLayout
      h2="Reset password"
      content={
        <>
          {!isEmailSent && (
            <form
              className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
              onSubmit={handleEmailSubmit(onSubmitEmail)}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-tertiary">
                  Enter your email address to receive a 6-digit verification
                  code for password reset.
                </p>
              </div>
              <Controller
                name="email"
                control={emailControl}
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={field.value}
                    onChange={field.onChange}
                    error={emailErrors.email?.message}
                  />
                )}
              />

              <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light o outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
                Submit
              </button>
            </form>
          )}

          {!isOtpSubmitted && isEmailSent && (
            <form
              className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
              onSubmit={handleOtpSubmit(onSubmitOtp)}
              noValidate
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-tertiary">
                  Enter the 6-digit code sent to your email address.
                </p>
              </div>
              <div className="w-full">
                <Controller
                  name="otp"
                  control={otpControl}
                  rules={{
                    required: "Please enter the verification code",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Please enter a valid 6-digit code",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <div
                        className="flex justify-between gap-2"
                        onPaste={handlePaste}
                      >
                        {Array(6)
                          .fill(0)
                          .map((_, i) => (
                            <input
                              key={i}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              ref={(e) => {
                                inputRefs.current[i] = e;
                              }}
                              value={(value || "")[i] || ""}
                              className={`bg-tertiary-light h-12 w-12 rounded-md border-2 text-center outline-none ${
                                error
                                  ? "border-primary-1 text-primary-1 focus:border-primary-1"
                                  : "text-tertiary border-[rgba(var(--color-tertiary-rgb),0.75)] focus:border-[rgba(var(--color-tertiary-rgb),1)]"
                              } text-xl`}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                if (newVal.match(/^[0-9]?$/)) {
                                  const otpArray = value
                                    ? value.split("")
                                    : Array(6).fill("");
                                  otpArray[i] = newVal;
                                  const newOtp = otpArray.join("");
                                  onChange(newOtp);
                                  handleInput(e, i);
                                  if (newOtp.length === 6) {
                                    triggerOtpValidation();
                                  }
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Backspace") {
                                  const otpArray = value
                                    ? value.split("")
                                    : Array(6).fill("");
                                  otpArray[i] = "";
                                  onChange(otpArray.join(""));
                                  handleKeyDown(e, i);
                                }
                              }}
                            />
                          ))}
                      </div>
                      {error && (
                        <span className="text-primary-1 mt-2 block text-sm">
                          {error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <button
                type="submit"
                className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
              >
                Submit
              </button>
              <p className="text-tertiary">
                Didn't receive an email?{" "}
                {!isOtpResent ? (
                  <Link
                    to="#"
                    onClick={handleResendOtp}
                    className="outline-tertiary font-semibold underline"
                  >
                    Resend
                  </Link>
                ) : (
                  <span>Resend again in {formatTime(timeLeft)}</span>
                )}
              </p>
            </form>
          )}

          {isOtpSubmitted && isEmailSent && (
            <form
              className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
              onSubmit={handleNewPasswordSubmit(onSubmitNewPassowrd)}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-tertiary">Enter your desired new password</p>
              </div>

              <Controller
                name="newPassword"
                control={newPasswordControl}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="New password"
                    value={field.value}
                    onChange={field.onChange}
                    error={newPasswordErrors.newPassword?.message}
                  />
                )}
              />
              <div className="flex justify-between gap-2"></div>
              <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
                Submit
              </button>
            </form>
          )}
        </>
      }
    />
  );
}
