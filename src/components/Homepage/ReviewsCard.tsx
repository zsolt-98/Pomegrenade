import { useMediaQuery } from "react-responsive";
import FiveStars from "../SVG/FiveStars";

interface ReviewCardProps {
  cardClassName?: string;
  bgColor: string;
  starColor: string;
  pColor: string;
  pText: string;
  hColor: string;
  hText: string;
}

export default function ReviewsCard({
  cardClassName,
  bgColor,
  starColor,
  pColor,
  pText,
  hColor,
  hText,
}: ReviewCardProps) {
  const isUnderXLScreen = useMediaQuery({ maxWidth: 1279 });
  const isUnderMDScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={`${bgColor} ${cardClassName} flex ${isUnderMDScreen ? "h-60 w-60" : isUnderXLScreen ? "h-80 w-80 gap-3" : "h-110 w-110 gap-5"} flex-col rounded-4xl p-5`}
    >
      <FiveStars size={24} fill={starColor} />
      <p className={`text-xs md:text-sm xl:text-lg ${pColor}`}>{pText}</p>
      <div className="h-0.5 w-60 bg-stone-300 opacity-45"></div>
      <h3 className={`${hColor} font-semibold`}>{hText}</h3>
    </div>
  );
}
