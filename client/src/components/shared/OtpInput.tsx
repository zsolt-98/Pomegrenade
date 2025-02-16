import { useRef } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onComplete?: () => void;
};

export default function OtpInput({
  value,
  onChange,
  error,
  onComplete,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <div className="w-full">
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
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
                  const otpArray = value ? value.split("") : Array(6).fill("");
                  otpArray[i] = newVal;
                  const newOtp = otpArray.join("");
                  onChange(newOtp);
                  handleInput(e, i);
                  if (newOtp.length === 6) {
                    onComplete?.();
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  const otpArray = value ? value.split("") : Array(6).fill("");
                  otpArray[i] = "";
                  onChange(otpArray.join(""));
                  handleKeyDown(e, i);
                }
              }}
            />
          ))}
      </div>
      {error && (
        <span className="text-primary-1 mt-2 block text-sm">{error}</span>
      )}
    </div>
  );
}
