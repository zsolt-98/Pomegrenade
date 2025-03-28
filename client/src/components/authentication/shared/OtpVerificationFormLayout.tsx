import { Control, Controller } from "react-hook-form";
import OtpInput from "./OtpInput";

type OtpFormValues = {
  otp: string;
};

type OtpVerificationFormLayoutProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<OtpFormValues>;
  triggerOtpValidation: () => void;
  isResendDisabled: boolean;
  handleResendOtp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formatTime: (seconds: number) => string;
  timeLeft: number;
  isResending: boolean;
};

export default function OtpVerificationFormLayout({
  onSubmit,
  control,
  triggerOtpValidation,
  isResendDisabled,
  handleResendOtp,
  formatTime,
  timeLeft,
  isResending,
}: OtpVerificationFormLayoutProps) {
  return (
    <form
      className="flex w-full max-w-[364px] flex-col items-center justify-center gap-6 text-sm md:text-lg"
      onSubmit={onSubmit}
      noValidate
    >
      <p className="text-tertiary">
        Enter the 6-digit code sent to your email address.
      </p>
      <Controller
        name="otp"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <OtpInput
            value={value}
            onChange={onChange}
            error={error?.message}
            onComplete={triggerOtpValidation}
          />
        )}
      />
      <button
        type="submit"
        className="border-tertiary text-tertiary hover:bg-tertiary hover:text-secondary-light outline-tertiary w-full rounded-full border-2 px-5 py-2 text-2xl font-normal"
      >
        Submit
      </button>
      <p className="text-tertiary">
        Didn't receive an email?{" "}
        {!isResendDisabled ? (
          <button
            type="button"
            disabled={isResending}
            onClick={handleResendOtp}
            className="outline-tertiary font-semibold underline"
          >
            Resend
          </button>
        ) : (
          <span>Resend again in {formatTime(timeLeft)}</span>
        )}
      </p>
    </form>
  );
}
