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
  const { addedFoods, setSelectedDate } = useLogFood();
  const [caloriesBudget, setCaloriesBudget] = useState<number>(0);
  const [totalFoodCalories, setTotalFoodCalories] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate, setSelectedDate]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setIsTransitioning(false);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  });

  const changeDate = (direction: "prev" | "next") => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }

    setCurrentDate(newDate);

    if (api) {
      if (direction === "prev") {
        api.scrollPrev();
      } else {
        api.scrollNext();
      }
    }
  };

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
      const foodDate = new Date(food.entryDate);

      if (
        foodDate.getDate() === currentDate.getDate() &&
        foodDate.getMonth() === currentDate.getMonth() &&
        foodDate.getFullYear() === currentDate.getFullYear()
      ) {
        return (
          total + calculateCalories(food.food_description || "", food.servings)
        );
      }
      return total;
    }, 0);

    setTotalFoodCalories(Math.round(totalCalories));
  }, [addedFoods, currentDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDayDescription = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 py-20 2xl:px-0">
        <div className="text-primary-1 mb-5 flex items-center justify-center gap-8 text-2xl font-semibold">
          <button
            onClick={() => changeDate("prev")}
            disabled={isTransitioning}
            className="cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="flex justify-center gap-5 max-sm:w-full sm:min-w-80">
            <h3 className="max-sm:text-lg">
              {getDayDescription(currentDate)} - {formatDate(currentDate)}
            </h3>
          </div>
          <button
            onClick={() => changeDate("next")}
            disabled={isTransitioning}
            className="cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        <Carousel
          opts={{ loop: true }}
          setApi={setApi}
          className="h-auto w-full"
        >
          <CarouselContent>
            {[0, 1].map((i) => (
              <CarouselItem key={i}>
                <div className="flex w-full flex-col gap-5">
                  <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
                    <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
                      <DashboardHeadings
                        caloriesBudget={caloriesBudget}
                        totalFoodCalories={totalFoodCalories}
                      />
                    </div>
                    <Meal
                      mealTypeHeading="Breakfast"
                      selectedDate={currentDate}
                    />
                    <Meal mealTypeHeading="Lunch" selectedDate={currentDate} />
                    <Meal mealTypeHeading="Dinner" selectedDate={currentDate} />
                    <Meal mealTypeHeading="Snacks" selectedDate={currentDate} />
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
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  );
}
