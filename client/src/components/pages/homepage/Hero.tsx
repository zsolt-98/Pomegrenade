import Divider from "../../global/svg/Divider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pic1 from "../../../../public/homepage-carousel-functionality/1.png";
import pic2 from "../../../../public/homepage-carousel-functionality/2.png";
import pic3 from "../../../../public/homepage-carousel-functionality/3.png";
// import dashboardEditAddedFood from "../../../../public/homepage-carousel-functionality/5-dashboard-edit-added-food-924x510px.png";
// import userGoals from "../../../../public/homepage-carousel-functionality/6-user-goals-924x510px.png";
// import userGoalsEditWeight from "../../../../public/homepage-carousel-functionality/7-user-goals-edit-weight-924x510px.png";
// import userGoalsEditMacronutrients from "../../../../public/homepage-carousel-functionality/8-user-goals-edit-macronutrients-924x510px.png";
// import userProfile from "../../../../public/homepage-carousel-functionality/9-user-profile-924x510px.png";

export default function Hero() {
  // const carouselImages = [
  //   emptyDashboard,
  //   emptyDashboardAddFood,
  //   emptyDashboardSelectedFood,
  //   dashboardWithAddedFoods,
  //   dashboardEditAddedFood,
  //   userGoals,
  //   userGoalsEditWeight,
  //   userGoalsEditMacronutrients,
  //   userProfile,
  // ];

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.1"],
  });

  const scrollBasedX = useTransform(scrollYProgress, [0, 1], ["75%", "-125%"]);

  return (
    <main
      className="bg-tertiary-light lg:pb-30 relative flex min-h-[calc(100vh-6rem)] w-full flex-col items-start justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="bg-tertiary-light container relative mx-auto my-20 flex max-w-7xl flex-col">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <div className="mx-5">
            <h2 className="text-tertiary 3xl:text-3xl text-[4vw] font-semibold md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw]">
              A lightweight
            </h2>
            <h1 className="text-primary-1 3xl:text-7xl text-nowrap text-[10vw] font-bold leading-none md:text-[7.5vw] lg:text-[6.5vw] xl:text-[5.5vw]">
              calorie counter <br /> with a bang.
            </h1>
          </div>
        </div>
      </div>
      <Divider className="absolute top-0" fill="var(--color-secondary-light)" />
      <motion.div
        className="rotate-4 z-10 mt-10 flex w-screen gap-10"
        style={{ x: scrollBasedX }}
      >
        <img
          src={pic1}
          className=""
          // alt={`image of ${image}`}
        />
        <img
          src={pic2}
          className=""
          // alt={`image of ${image}`}
        />
        <img
          src={pic3}
          className=""
          // alt={`image of ${image}`}
        />
        <img
          src={pic1}
          className=""
          // alt={`image of ${image}`}
        />
        <img
          src={pic2}
          className=""
          // alt={`image of ${image}`}
        />
        <img
          src={pic3}
          className=""
          // alt={`image of ${image}`}
        />
      </motion.div>
    </main>
  );
}
