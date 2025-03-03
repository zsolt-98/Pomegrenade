import { useLogFood } from "@/context/application/LogFoodContext";
import { AddFoodDropDown } from "./AddFood/AddFoodDropdown";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EditFoodEntry } from "./AddFood/EditFoodEntry";

export default function MainDashboard() {
  const { addedFoods, loadUserFoods, deleteFood, isDeletingEntry } =
    useLogFood();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  useEffect(() => {
    loadUserFoods();
  }, [loadUserFoods]);

  const calculateDisplayAmount = (
    servingSize: string,
    servings: number,
  ): string => {
    const servingSizeMatch = servingSize.match(/^([\d./]+)?\s*(.*)$/);

    if (!servingSizeMatch) {
      return `${servings} x ${servingSize}`;
    }

    const numericPart = servingSizeMatch[1];
    const unit = servingSizeMatch[2];

    const baseAmount = numericPart.includes("/")
      ? parseFloat(numericPart.split("/")[0]) /
        parseFloat(numericPart.split("/")[1])
      : parseFloat(numericPart);

    return `${baseAmount * servings} ${unit}`;
  };

  const calculateCalories = (
    nutritionData: string,
    servings: number,
  ): number => {
    const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
    return caloriesMatch ? parseFloat(caloriesMatch[1]) * servings : 0;
  };

  return (
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="h-[75vh] w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary h-full divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <div className="w-[25%] py-2">
                <h4 className="">Budget</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Food</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Exercise</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Net</h4>
                <p className="">-</p>
              </div>
            </div>
            <div className="bg-secondary-light flex flex-col">
              <div className="flex items-center justify-between p-2">
                <h3 className="text-primary-1 text-2xl font-semibold">
                  Breakfast: 0
                </h3>
                <div className="relative">
                  <AddFoodDropDown />
                </div>
              </div>
              <div
                className={`bg-secondary-light ${addedFoods.length > 0 ? "" : "h-0"}`}
              >
                <div className="bg-tertiary-light m-2 mt-0 rounded-lg">
                  {addedFoods.length > 0 && (
                    <ul className="divide-tertiary divide-y-1 border-tertiary rounded-lg border">
                      {addedFoods.map((food) => {
                        const displayAmount = calculateDisplayAmount(
                          food.servingSize,
                          food.servings,
                        );
                        const calories = calculateCalories(
                          food.food_description || "",
                          food.servings,
                        );
                        const dropdownId = food.food_id;
                        return (
                          <li
                            key={food.food_id}
                            className="hover:bg-secondary-light-2 group relative flex cursor-pointer flex-col overflow-hidden px-4 py-2 first:hover:rounded-t-lg last:hover:rounded-b-lg"
                          >
                            <div className="flex justify-between">
                              <span className="text-tertiary font-medium">
                                {food.food_name} ({displayAmount})
                              </span>
                              <div className="flex items-center">
                                <span className="text-tertiary font-medium transition-transform duration-300 ease-in-out group-hover:translate-x-[-100px]">
                                  {calories.toFixed(0)}
                                </span>
                                <div className="absolute right-2 flex translate-x-full transform gap-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                                  <Button
                                    className="rounded-4xl bg-tertiary text-tertiary-light h-auto px-1.5 py-0.5"
                                    onClick={() =>
                                      setIsOpen(
                                        isOpen === dropdownId
                                          ? null
                                          : dropdownId,
                                      )
                                    }
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="rounded-4xl bg-primary-1 text-tertiary-light h-auto px-1.5 py-0.5"
                                    onClick={() => {
                                      if (food._id) {
                                        deleteFood(food._id);
                                      }
                                    }}
                                    disabled={isDeletingEntry}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {isOpen === dropdownId && (
                              <div className="flex h-20 justify-end">
                                <div className="">
                                  <EditFoodEntry
                                    food={food}
                                    onClose={() => setIsOpen(null)}
                                  />
                                </div>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </main>
  );
}
