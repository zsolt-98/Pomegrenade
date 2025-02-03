import { useMediaQuery } from "react-responsive";
import { SVGProps } from "../../types";

export default function Divider({ className, fill }: SVGProps) {
  const isUnderXLScreen = useMediaQuery({ maxWidth: 1279 });

  return isUnderXLScreen ? (
    <svg
      className={`h-[75%] w-full ${className || ""}`}
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
      className={`h-[calc(100%-6rem)] w-full ${className || ""}`}
      viewBox="0 0 1924 820"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H1481H1923V443C1923 443 1611.72 88.0011 1307 327C1002.28 565.999 912.269 819 525 819C237 819 1 559 1 559V1Z"
        fill={fill}
        stroke={fill}
        strokeWidth="3"
      />
    </svg>
  );
}
