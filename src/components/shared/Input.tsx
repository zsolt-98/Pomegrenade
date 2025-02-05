interface InputProps {
  type: string;
  className?: string;
  placeholder: string;
}

export default function Input({ type, className, placeholder }: InputProps) {
  return (
    <input
      type={type}
      className={`bg-tertiary-light w-full rounded-sm border-2 p-2 ${className}`}
      placeholder={placeholder}
      style={{ borderColor: "rgba(var(--color-tertiary-rgb), 0.75)" }}
    />
  );
}
