import FiveStars from "../components/SVG/FiveStars";

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
  return (
    <div
      className={`${bgColor} ${cardClassName} rounded-4xl xl:h-110 xl:w-110 flex h-60 w-60 flex-col justify-evenly gap-1 p-3 md:h-80 md:w-80 xl:gap-5 xl:p-5`}
    >
      <FiveStars size={24} fill={starColor} />
      <p className={`text-xs md:text-sm xl:text-lg ${pColor}`}>{pText}</p>
      <div className="h-0.5 w-[65%] bg-stone-600 opacity-20"></div>
      <h3 className={`${hColor} font-semibold`}>{hText}</h3>
    </div>
  );
}
