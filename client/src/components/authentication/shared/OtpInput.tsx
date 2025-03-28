import { useRef } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onComplete?: () => void;
};

export default function OtpInput({
  value = "",
  onChange,
  error,
  onComplete,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      if (newVal.match(/^[0-9]?$/)) {
        const otpArray = value.split("");
        otpArray[index] = newVal;
        const newOtp = otpArray.join("");
        onChange(newOtp);

        if (newVal.length > 0 && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.length === 6 && !newOtp.includes("")) {
          onComplete?.();
        }
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
    event.preventDefault();
    const paste = event.clipboardData.getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6);

    if (digits.length > 0) {
      onChange(digits);
      setTimeout(() => {
        if (digits.length < 6) {
          inputRefs.current[digits.length]?.focus();
        } else {
          inputRefs.current[5]?.focus();
          onComplete?.();
        }
      }, 0);
    }
  };

  return (
    <div className="sm:w-full">
      <div
        className="flex justify-between gap-1.5 sm:gap-2"
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
              value={value[i] || ""}
              className={`bg-tertiary-light h-12 w-12 rounded-md border-2 text-center outline-none max-sm:h-10 max-sm:w-10 ${
                error
                  ? "border-primary-1 text-primary-1 focus:border-primary-1"
                  : "text-tertiary border-[rgba(var(--color-tertiary-rgb),0.75)] focus:border-[rgba(var(--color-tertiary-rgb),1)]"
              } text-xl`}
              onChange={handleChange(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
      </div>
      {error && (
        <span className="text-primary-1 mt-2 block text-sm">{error}</span>
      )}
    </div>
  );
}
