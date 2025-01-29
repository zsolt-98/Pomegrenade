import { SVGProps } from "../../types";

export default function Divider({ className, fill }: SVGProps) {
  return (
    <svg
      className={`h-200 w-full ${className || ""}`}
      viewBox="0 0 1924 832"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H1481H1924V253C1924 253 1879.78 192.868 1840 169C1670 67 1402.35 253 1308 327C1003.28 565.999 904.842 899.347 526 819C225.684 755.307 0 233 0 233V0Z"
        fill={fill}
        // stroke={stroke}
        // strokeWidth="0"
      />
    </svg>
  );
}
