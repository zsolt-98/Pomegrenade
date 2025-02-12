interface InputProps {
  type: string;
  className?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  className,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      className={`bg-tertiary-light text-tertiary w-full rounded-sm border-2 border-[rgba(var(--color-tertiary-rgb),0.75)] p-2 text-lg outline-none transition-colors duration-200 focus:border-[rgba(var(--color-tertiary-rgb),1)] ${className || ""}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
