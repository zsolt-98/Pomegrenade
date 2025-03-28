import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Divider from "../../global/svg/Divider";

import emptyDashboard from "../../../../public/homepage-carousel-functionality/1-empty-dashboard-924x510px.png";
import emptyDashboardAddFood from "../../../../public/homepage-carousel-functionality/2-empty-dashboard-add-food-924x510px.png";
import emptyDashboardSelectedFood from "../../../../public/homepage-carousel-functionality/3-empty-dashboard-selected-food-924x510px.png";
import dashboardWithAddedFoods from "../../../../public/homepage-carousel-functionality/4-dashboard-with-added-foods-924x510px.png";
import dashboardEditAddedFood from "../../../../public/homepage-carousel-functionality/5-dashboard-edit-added-food-924x510px.png";
import userGoals from "../../../../public/homepage-carousel-functionality/6-user-goals-924x510px.png";
import userGoalsEditWeight from "../../../../public/homepage-carousel-functionality/7-user-goals-edit-weight-924x510px.png";
import userGoalsEditMacronutrients from "../../../../public/homepage-carousel-functionality/8-user-goals-edit-macronutrients-924x510px.png";
import userProfile from "../../../../public/homepage-carousel-functionality/9-user-profile-924x510px.png";

export default function Hero() {
  const carouselImages = [
    emptyDashboard,
    emptyDashboardAddFood,
    emptyDashboardSelectedFood,
    dashboardWithAddedFoods,
    dashboardEditAddedFood,
    userGoals,
    userGoalsEditWeight,
    userGoalsEditMacronutrients,
    userProfile,
  ];

  return (
    <main className="bg-tertiary-light relative flex min-h-[calc(100vh-6rem)] w-full items-center justify-center overflow-hidden lg:pb-20">
      <div className="bg-tertiary-light container relative mx-auto my-20 flex max-w-7xl flex-col">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-20 self-center xl:flex-row">
          <div className="mx-5">
            <h2 className="text-tertiary 3xl:text-3xl text-[4vw] font-semibold md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw]">
              A lightweight
            </h2>
            <h1 className="text-primary-1 3xl:text-7xl text-nowrap text-[10vw] font-bold leading-none md:text-[7.5vw] lg:text-[6.5vw] xl:text-[5.5vw]">
              calorie counter <br /> with a bang.
            </h1>
          </div>
          <div className="max-w-160 mx-5">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselPrevious />
              <CarouselNext />
              <CarouselContent>
                {carouselImages.map((image) => (
                  <CarouselItem key={image}>
                    <img
                      src={image}
                      className="border-tertiary rounded-4xl border-3 w-full"
                      alt={`image of ${image}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
      <Divider className="absolute top-0" fill="var(--color-secondary-light)" />
    </main>
  );
}
