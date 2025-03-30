import FiveStars from "../../global/svg/FiveStars";
import { motion } from "framer-motion";

interface ReviewCardProps {
  cardClassName?: string;
  bgColor: string;
  starColor: string;
  pColor: string;
  pText: string;
  hColor: string;
  hText: string;
  isInView: boolean;
  delay: number;
}

export default function ReviewsCard({
  cardClassName,
  bgColor,
  starColor,
  pColor,
  pText,
  hColor,
  hText,
  isInView,
  delay,
}: ReviewCardProps) {
  return (
    <motion.div
      className={`${bgColor} ${cardClassName} rounded-4xl xl:h-110 xl:w-110 flex h-60 w-60 flex-col justify-evenly gap-1 p-3 md:h-80 md:w-80 xl:gap-5 xl:p-5`}
      initial={{ y: -200, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <FiveStars size={24} fill={starColor} />
      <p className={`text-xs md:text-sm xl:text-lg ${pColor}`}>{pText}</p>
      <div className="h-0.5 w-[65%] bg-stone-600 opacity-20"></div>
      <h3 className={`${hColor} font-semibold`}>{hText}</h3>
    </motion.div>
  );
}
