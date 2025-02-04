import { SVGProps } from "../../types";

export default function DividerReviews({ className, fill }: SVGProps) {
  return (
    <svg
      className={`w-full ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 52"
      fill={fill}
    >
      <path d="M0 0v4c154 48 190 8.95 300 8.95 92 0 92 39.05 200 39.05s108-39.1 200-39.1c110 0 146 39.1 300-8.9V0H0Z"></path>
    </svg>
  );
}
