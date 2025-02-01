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
  return (
    <div
      className={`${bgColor} ${cardClassName} flex h-100 w-100 flex-col gap-5 rounded-4xl p-10`}
    >
      <FiveStars size={24} fill={starColor} />
      <p className={pColor}>{pText}</p>
      <div className="h-0.5 w-60 bg-stone-300 opacity-45"></div>
      <h3 className={`${hColor} font-semibold`}>{hText}</h3>
    </div>
  );
}
