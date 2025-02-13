import { useContext, useRef, useState } from "react";
import Input from "../shared/Input";
import AuthLayout from "./AuthLayout";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

export default function ResetPassword() {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState<number | string>(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

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

  const onSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    }
  };

  const onSubmitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e?.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassowrd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword },
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error); // Temporary
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
              onSubmit={onSubmitEmail}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-tertiary">
                  Enter your email address to receive a 6-digit verification
                  code for password reset.
                </p>
              </div>
              <Input
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <div className="flex justify-between gap-2"></div>

              <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
                Submit
              </button>
            </form>
          )}

          {!isOtpSubmitted && isEmailSent && (
            <form
              className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
              onSubmit={onSubmitOtp}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-tertiary">
                  Enter the 6-digit code sent to your email address.
                </p>
              </div>
              <div className="flex justify-between gap-2" onPaste={handlePaste}>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <input
                      type="text"
                      maxLength={1}
                      key={i}
                      required
                      className="bg-tertiary-light h-12 w-12 rounded-md text-center text-xl"
                      ref={(e) => (inputRefs.current[i] = e)}
                      onChange={(e) => handleInput(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                    />
                  ))}
              </div>
              <div className="flex justify-between gap-2"></div>
              <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
                Submit
              </button>
              <p className="text-tertiary">
                Didn't receive an email?{" "}
                <Link to="/register" className="font-semibold underline">
                  Resend
                </Link>
              </p>
            </form>
          )}
          {isOtpSubmitted && isEmailSent && (
            <form
              className="flex w-full max-w-[364px] flex-col items-center justify-center gap-3 text-sm md:text-lg"
              onSubmit={onSubmitNewPassowrd}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-tertiary">Enter your desired new password</p>
              </div>

              <Input
                type="password"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <div className="flex justify-between gap-2"></div>
              <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light mt-7 w-full rounded-full border-2 px-5 py-2 text-2xl font-normal">
                Submit
              </button>
            </form>
          )}
        </>
      }
    />
  );
}
