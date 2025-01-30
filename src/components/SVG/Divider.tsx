import { SVGProps } from "../../types";

export default function Divider({ className, fill }: SVGProps) {
  return (
    <svg
      className={`h-200 w-full ${className || ""}`}
      viewBox="0 0 1924 820"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H1481H1923V443C1923 443 1611.72 88.0011 1307 327C1002.28 565.999 912.269 819 525 819C237 819 1 559 1 559V1Z"
        fill={fill}
        // stroke={stroke}
        // strokeWidth="0"
      />
    </svg>
  );
}
