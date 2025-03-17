import { useContext, useEffect, useState } from "react";
import Meal from "./AddFood/Meal";
import { AppContext } from "@/context/AppContext";
import axios from "axios";

function DashboardHeadings({ caloriesBudget }: { caloriesBudget: number }) {
  const data = [
    { heading: "Budget", value: caloriesBudget || 0 },
    { heading: "Food", value: 0 },
    { heading: "Exercise", value: 0 },
    { heading: "Net", value: 0 },
  ];
  return (
    <>
      {data.map((item) => (
        <div key={item.heading} className="w-[25%] py-2 leading-none">
          <h4 className="">{item.heading}</h4>
          <p className="">{item.value}</p>
        </div>
      ))}
    </>
  );
}

export default function MainDashboard() {
  const { backendUrl } = useContext(AppContext);
  const [caloriesBudget, setCaloriesBudget] = useState<number>(0);

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

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col">
        <div className="my-20 w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <DashboardHeadings caloriesBudget={caloriesBudget} />
            </div>
            <Meal mealTypeHeading="Breakfast" />
            <Meal mealTypeHeading="Lunch" />
            <Meal mealTypeHeading="Dinner" />
            <Meal mealTypeHeading="Snacks" />
            <div className="bg-secondary-light rounded-b-4xl leading-none">
              <div className="flex h-[52px] justify-end">
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
      </div>
    </main>
  );
}
