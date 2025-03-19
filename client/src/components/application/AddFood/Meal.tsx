import { useLogFood } from "@/context/application/LogFoodContext";
import { AddFoodDropDown } from "./AddFoodDropdown";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditFoodEntry } from "./EditFoodEntry";
import { MealType } from "@/types";
import {
  calculateCalories,
  calculateDisplayAmount,
} from "../utils/nutritionUtils";

type MealProps = {
  mealTypeHeading: MealType;
};

export default function Meal({ mealTypeHeading }: MealProps) {
  const { addedFoods, loadUserFoods, deleteFood, isDeletingEntry } =
    useLogFood();
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

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

  const handleItemClick = (foodId: string) => {
    if (activeItem === foodId) {
      setActiveItem(null);
    } else {
      setActiveItem(foodId);
    }
  };

  return (
    <div className="bg-secondary-light flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-primary-1 text-xl font-semibold sm:text-2xl">
          {mealTypeHeading}: {totalCalories.toFixed(0)}
        </h3>
        <div className="relative">
          <AddFoodDropDown mealType={mealTypeHeading} />
        </div>
      </div>
      <div className="bg-secondary-light">
        <div className="bg-tertiary-light m-2 mt-0 rounded-lg">
          {mealFoods.length === 0 && (
            <p className="border-tertiary border-1 text-tertiary h-[34px] rounded-lg px-1 py-1.5 text-sm font-medium sm:h-auto sm:px-4 sm:py-2 sm:text-lg">
              No food logged for {mealTypeHeading}
            </p>
          )}
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
                const isActive = activeItem === dropdownId;

                return (
                  <li
                    key={food.food_id}
                    className={`hover:bg-secondary-light-2 group relative flex h-[34px] cursor-pointer flex-col overflow-hidden px-1 py-1.5 first:hover:rounded-t-lg last:hover:rounded-b-lg sm:h-auto sm:px-4 sm:py-2 ${
                      isActive
                        ? "bg-secondary-light-2 first:rounded-t-lg last:rounded-b-lg"
                        : ""
                    }`}
                    onClick={() => handleItemClick(dropdownId)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-tertiary text-sm font-medium sm:text-lg">
                        {food.food_name} ({displayAmount})
                      </span>
                      <div className="flex items-center">
                        <span
                          className={`text-tertiary sm:text-md text-sm font-medium transition-transform duration-300 ease-in-out ${
                            isActive
                              ? "translate-x-[-78px] sm:translate-x-[-110px]"
                              : ""
                          }`}
                        >
                          {calories.toFixed(0)}
                        </span>
                        <div
                          className={`absolute right-1 flex transform gap-0.5 transition-all duration-300 ease-in-out sm:right-2 sm:gap-1 ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "translate-x-full opacity-0"
                          }`}
                        >
                          <Button
                            className="rounded-4xl text-tertiary hover:text-primary-1-light hover:bg-tertiary border-tertiary leading-0 sm:text-md h-auto border-2 bg-transparent px-0.5 py-0 text-xs sm:px-1.5 sm:py-0.5"
                            disabled={isOpen === dropdownId}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(
                                isOpen === dropdownId ? null : dropdownId,
                              );
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="rounded-4xl border-primary-1 hover:bg-primary-1 hover:text-primary-1-light text-primary-1 leading-0 sm:text-md h-auto border-2 bg-transparent px-0.5 py-0 text-xs sm:px-1.5 sm:py-0.5"
                            onClick={(e) => {
                              e.stopPropagation();
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
