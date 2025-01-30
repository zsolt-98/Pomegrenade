import { SVGProps } from "../../types";

export default function DividerSm({ className, fill }: SVGProps) {
  return (
    <svg
      className={`w-full ${className || ""}`}
      viewBox="0 0 1260 1260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0H1260V630C1260 978.528 978.528 1260 630 1260C281.472 1260 0 978.528 0 630V0Z"
        fill={fill}
      />
    </svg>
  );
}
