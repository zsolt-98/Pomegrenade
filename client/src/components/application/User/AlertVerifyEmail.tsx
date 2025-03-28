import { useResendOtp } from "@/components/authentication/hooks/useResendOtp";
import { AlertCircle } from "lucide-react";

export function AlertVerifyEmail() {
  const { handleResendOtp, isResending } = useResendOtp({
    endpoint: "send-verify-otp",
  });

  return (
    <div className="inline-block">
      <div className="bg-primary-1-light border-primary-1 text-primary-1 mb-5 flex items-center gap-2 rounded-lg border-2 p-2">
        <div className="">
          <AlertCircle className="size-6 lg:size-7" />
        </div>
        <div className="max-lg:text-xs">
          <h4 className="font-semibold">Verify your email address</h4>
          <h5 className="">
            Welcome to Pomegrenade! To complete your registration, please
            confirm your email address. Click{" "}
            <button
              className="text-tertiary cursor-pointer font-semibold hover:underline"
              onClick={handleResendOtp}
              disabled={isResending}
            >
              here
            </button>{" "}
            to proceed.
          </h5>
        </div>
      </div>
    </div>
  );
}
