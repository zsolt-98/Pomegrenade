import { AlertCircle } from "lucide-react";

export function AlertVerifyEmail() {
  return (
    <div className="inline-block">
      <div className="bg-primary-1-light border-primary-1 text-primary-1 mb-5 flex items-center gap-2 rounded-lg border-2 p-2">
        <AlertCircle className="h-6 w-6" />
        <div className="">
          <h4 className="font-semibold">Verify your email address</h4>
          <h5 className="">
            Welcome to Pomegrenade! To complete your registration, you have to
            confirm your email address. Click on "Verify Email" to proceed.
          </h5>
        </div>
      </div>
    </div>
    // <Alert variant="destructive">
    //   <AlertCircle className="h-4 w-4" />
    //   <AlertTitle>Verify your email address</AlertTitle>
    //   <AlertDescription>
    //
    //   </AlertDescription>
    // </Alert>
  );
}
