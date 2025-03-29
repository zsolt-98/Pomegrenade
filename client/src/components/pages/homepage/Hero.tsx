import Divider from "../../global/svg/Divider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import dashboardWithAddedFoods from "../../../../public/homepage-carousel-functionality/1-dashboard-with-added-foods-813x586px.png";
import emptyDashboardAddFood from "../../../../public/homepage-carousel-functionality/2-empty-dashboard-add-food-813x586px.png";
import dashboardEditAddedFood from "../../../../public/homepage-carousel-functionality/3-dashboard-edit-added-food-813x586px.png";
import { useMediaQuery } from "react-responsive";

export default function Hero() {
  const isUnderSmScreen = useMediaQuery({ maxWidth: 639 });
  const isUnderMdScreen = useMediaQuery({ maxWidth: 767 });
  const isUnderLgScreen = useMediaQuery({ maxWidth: 1023 });
  const isUnderXLScreen = useMediaQuery({ maxWidth: 1279 });
  const isUnder2XLScreen = useMediaQuery({ maxWidth: 1535 });

  const images = [
    dashboardWithAddedFoods,
    emptyDashboardAddFood,
    dashboardEditAddedFood,
  ];
  const imagesToScroll = [...images, ...images];

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.1"],
  });

  const getScrollValues = useMemo(() => {
    if (isUnderSmScreen) {
      return { start: "185%", end: "-305%" };
    }

    if (isUnderMdScreen) {
      return { start: "280%", end: "-500%" };
    }

    if (isUnderLgScreen) {
      return { start: "200%", end: "-350%" };
    }

    if (isUnderXLScreen) {
      return { start: "125%", end: "-250%" };
    }

    if (isUnder2XLScreen) {
      return { start: "100%", end: "-175%" };
    }
    return {
      start: "85%",
      end: "-125%",
    };
  }, [isUnder2XLScreen, isUnderXLScreen, isUnderLgScreen, isUnderMdScreen]);

  const scrollBasedX = useTransform(
    scrollYProgress,
    [0, 1],
    [getScrollValues.start, getScrollValues.end],
  );

  return (
    <main
      className="bg-tertiary-light lg:pb-30 relative flex w-full flex-col items-center justify-between overflow-hidden max-sm:gap-10 sm:min-h-[calc(100vh-6rem)]"
      ref={containerRef}
    >
      <div className="bg-tertiary-light container relative mx-auto mt-10 flex max-w-7xl flex-col pb-10 sm:mt-20 sm:pb-20">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <div className="mx-5">
            <h2 className="text-tertiary text-lg font-semibold sm:text-xl md:text-3xl">
              A lightweight
            </h2>
            <h1 className="text-primary-1 text-nowrap text-4xl font-semibold leading-none sm:text-5xl md:text-7xl">
              calorie counter <br /> with a bang.
            </h1>
          </div>
        </div>
      </div>
      <Divider className="absolute top-0" fill="var(--color-secondary-light)" />
      {isUnderSmScreen && (
        <div className="flex flex-col gap-5">
          <h3 className="text-tertiary font-medium">
            Are you ready for a healthier you?
          </h3>
          <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-tertiary-light rounded-full border-2 px-5 py-2 text-2xl font-normal">
            Get started now
          </button>
        </div>
      )}
      <motion.div
        className="rotate-4 z-10 flex w-screen gap-10 pb-10 sm:mt-10 sm:max-lg:pb-20"
        style={{ x: scrollBasedX }}
      >
        {imagesToScroll.map((image) => (
          <img
            src={image}
            className="w-auto max-sm:max-h-60"
            alt={`image of ${image}`}
          />
        ))}
      </motion.div>
    </main>
  );
}
