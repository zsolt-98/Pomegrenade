import { useLogFood } from "@/context/application/LogFoodContext";
import { AddFoodDropDown } from "./AddFoodDropdown";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditFoodEntry } from "./EditFoodEntry";
import { MealType } from "@/types";

type MealProps = {
  mealTypeHeading: MealType;
};

export default function Meal({ mealTypeHeading }: MealProps) {
  const { addedFoods, loadUserFoods, deleteFood, isDeletingEntry } =
    useLogFood();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const calculateCalories = (
    nutritionData: string,
    servings: number,
  ): number => {
    const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
    return caloriesMatch ? parseFloat(caloriesMatch[1]) * servings : 0;
  };

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

    const calculatedAmt = baseAmount * servings;
    const fixedAmt = parseFloat(calculatedAmt.toFixed(2));

    return `${fixedAmt} ${unit}`;
  };

  useEffect(() => {
    loadUserFoods();
  }, [loadUserFoods]);

  const mealFoods = useMemo(() => {
    return addedFoods.filter((food) => food.mealType === mealTypeHeading);
  }, [addedFoods, mealTypeHeading]);

  const totalCalories = useMemo(() => {
    return mealFoods.reduce((total, food) => {
      return (
        total + calculateCalories(food.food_description || "", food.servings)
      );
    }, 0);
  }, [mealFoods]);

  return (
    <div className="bg-secondary-light flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-primary-1 text-2xl font-semibold">
          {mealTypeHeading}: {totalCalories.toFixed(0)}
        </h3>
        <div className="relative">
          <AddFoodDropDown mealType={mealTypeHeading} />
        </div>
      </div>
      <div
        className={`bg-secondary-light ${mealFoods.length > 0 ? "" : "h-0"}`}
      >
        <div className="bg-tertiary-light m-2 mt-0 rounded-lg">
          {mealFoods.length > 0 && (
            <ul className="divide-tertiary divide-y-1 border-tertiary rounded-lg border">
              {mealFoods.map((food) => {
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
                            disabled={isOpen === dropdownId}
                            onClick={() =>
                              setIsOpen(
                                isOpen === dropdownId ? null : dropdownId,
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
                      <div className="flex justify-end pt-2">
                        <div className="border-1 border-tertiary rounded-lg p-2">
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
  );
}
