interface InputProps {
  type: string;
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Input({
  type,
  className,
  placeholder,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        className={`bg-tertiary-light w-full rounded-sm border-2 p-2 text-lg outline-none transition-colors duration-200 ${
          error
            ? "border-primary-1 text-primary-1 focus:border-primary-1"
            : "text-tertiary border-[rgba(var(--color-tertiary-rgb),0.75)] focus:border-[rgba(var(--color-tertiary-rgb),1)]"
        } ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-primary-1 ms-2 text-sm">{error}</span>}
    </div>
  );
}
