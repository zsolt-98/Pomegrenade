import { SVGProps } from "@/types";
import { useMediaQuery } from "react-responsive";

export default function Divider({ className, fill }: SVGProps) {
  const isUnderXLScreen = useMediaQuery({ maxWidth: 1280 });

  return isUnderXLScreen ? (
    <svg
      className={`h-1/3 w-full ${className || ""}`}
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
  ) : (
    <svg
      className={`h-[30%] w-full ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 179"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0v7.14s250 171.55 500 171.55 500-171.55 500-171.55V0H0Z"
        fill={fill}
      ></path>
    </svg>
  );
}
