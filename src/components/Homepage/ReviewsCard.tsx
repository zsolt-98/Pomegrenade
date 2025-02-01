import FiveStars from "../SVG/FiveStars";

interface ReviewCardProps {
  bgColor: string;
  starColor: string;
  pColor: string;
  hColor?: string;
}

export default function ReviewsCard({
  bgColor,
  starColor,
  pColor,
  hColor = pColor,
}: ReviewCardProps) {
  return (
    <div
      className={`${bgColor} flex h-100 w-100 flex-col gap-5 rounded-4xl p-10`}
    >
      <FiveStars size={24} fill={starColor} />
      <p className={pColor}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi minus ea
        cumque fugiat odio ullam magni natus, eveniet placeat rem animi optio
        tenetur rerum nam odit nihil, accusantium saepe. Tempore eligendi rem
        nostrum labore! Eius nesciunt quasi quia!
      </p>
      <div className="bg-primary-1 h-0.5 w-30 opacity-50"></div>
      <h3 className={hColor}>Simon F.</h3>
    </div>
  );
}
