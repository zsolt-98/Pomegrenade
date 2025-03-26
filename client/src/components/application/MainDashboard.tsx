import { useContext, useEffect, useState } from "react";
import Meal from "./AddFood/Meal";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { calculateCalories } from "./utils/nutritionUtils";
import { useLogFood } from "@/context/application/LogFoodContext";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type DashboardHeadingsProps = {
  caloriesBudget: number;
  totalFoodCalories: number;
};

function DashboardHeadings({
  caloriesBudget,
  totalFoodCalories,
}: DashboardHeadingsProps) {
  const data = [
    { heading: "Budget", value: caloriesBudget || 0 },
    { heading: "Food", value: totalFoodCalories || 0 },
  ];
  return (
    <>
      {data.map((item) => (
        <div
          key={item.heading}
          className="flex w-[50%] flex-col gap-2 py-2 leading-none"
        >
          <h4 className="text-lg leading-3">{item.heading}</h4>
          <p className="text-tertiary">{item.value} cal</p>
        </div>
      ))}
    </>
  );
}

export default function MainDashboard() {
  const { backendUrl } = useContext(AppContext);
  const { addedFoods } = useLogFood();
  const [caloriesBudget, setCaloriesBudget] = useState<number>(0);
  const [totalFoodCalories, setTotalFoodCalories] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const fetchNutritionGoals = async () => {
      try {
        const { data: apiResponse } = await axios.get(
          `${backendUrl}/api/goals/get`,
        );

        if (apiResponse.success) {
          setCaloriesBudget(
            Number(apiResponse.data.nutritionGoals.rawValues.calories),
          );
        }
      } catch (error) {
        console.error("Error fetching nutrition goals:", error);
      }
    };
    fetchNutritionGoals();
  }, [backendUrl]);

  useEffect(() => {
    const totalCalories = addedFoods.reduce((total, food) => {
      return (
        total + calculateCalories(food.food_description || "", food.servings)
      );
    }, 0);

    setTotalFoodCalories(Math.round(totalCalories));
  }, [addedFoods]);

  const handleCarouselScroll = (direction: "prev" | "next") => {
    if (api) {
      if (direction === "prev") {
        api.scrollPrev();
      } else {
        api.scrollNext();
      }
    }
  };

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 2xl:px-0">
        <Carousel opts={{ loop: true }} setApi={setApi}>
          <div className="text-primary-1 flex items-center justify-center gap-8 text-2xl font-semibold">
            <Button
              variant="ghost"
              onClick={() => handleCarouselScroll("prev")}
            >
              <ChevronLeft size={32} />
            </Button>
            <div className="flex gap-5">
              <h3 className="">Today - 21/03/2025</h3>
            </div>
            <Button
              variant="ghost"
              onClick={() => handleCarouselScroll("next")}
            >
              <ChevronRight size={32} />
            </Button>
          </div>
          <CarouselContent>
            <CarouselItem>
              <div className="my-20 flex w-full flex-col gap-5">
                <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
                  <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
                    <DashboardHeadings
                      caloriesBudget={caloriesBudget}
                      totalFoodCalories={totalFoodCalories}
                    />
                  </div>
                  <Meal mealTypeHeading="Breakfast" />
                  <Meal mealTypeHeading="Lunch" />
                  <Meal mealTypeHeading="Dinner" />
                  <Meal mealTypeHeading="Snacks" />
                  <div className="bg-secondary-light rounded-b-4xl leading-none">
                    <div className="flex h-[60px] justify-end">
                      <a href="https://www.fatsecret.com">
                        <img
                          src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png"
                          srcSet="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x"
                          style={{ border: 0 }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="my-20 flex w-full flex-col gap-5">
                <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
                  <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
                    <DashboardHeadings
                      caloriesBudget={caloriesBudget}
                      totalFoodCalories={totalFoodCalories}
                    />
                  </div>
                  <Meal mealTypeHeading="Breakfast" />
                  <Meal mealTypeHeading="Lunch" />
                  <Meal mealTypeHeading="Dinner" />
                  <Meal mealTypeHeading="Snacks" />
                  <div className="bg-secondary-light rounded-b-4xl leading-none">
                    <div className="flex h-[60px] justify-end">
                      <a href="https://www.fatsecret.com">
                        <img
                          src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png"
                          srcSet="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x"
                          style={{ border: 0 }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  );
}
