import { Star } from "lucide-react";
import { SVGProps } from "../../../types";

export default function FiveStars({ fill, size }: SVGProps) {
  return (
    <div className="flex">
      <Star size={size} fill={fill} color={fill} />
      <Star size={size} fill={fill} color={fill} />
      <Star size={size} fill={fill} color={fill} />
      <Star size={size} fill={fill} color={fill} />
      <Star size={size} fill={fill} color={fill} />
    </div>
  );
}
