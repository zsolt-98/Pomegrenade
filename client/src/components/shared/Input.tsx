interface InputProps {
  type: string;
  className?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Input({
  type,
  className,
  placeholder,
  onChange,
  value,
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      className={`bg-tertiary-light text-tertiary w-full rounded-sm border-2 p-2 text-lg ${className || ""}`}
      placeholder={placeholder}
      style={{
        borderColor: "rgba(var(--color-tertiary-rgb), 0.75)",
      }}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
}
