import { useLogFood } from "@/context/application/LogFoodContext";
import { Food } from "@/types";
import { useState } from "react";
import { useNutritionCalculator } from "../hooks/useNutritionCalculator";
import { MacrosPieChart } from "./MacrosPieChart";

type EditFoodEntryProps = {
  food: Food;
  onClose: () => void;
  isActive: boolean;
};

export function EditFoodEntry({ food, onClose, isActive }: EditFoodEntryProps) {
  const { updateFood } = useLogFood();
  const [servings, setServings] = useState(food.servings);

  const { servingSize } = useNutritionCalculator(food, servings);

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setServings(Math.min(value, 99));
  };

  const handleUpdate = () => {
    if (food._id) {
      updateFood(food._id, servingSize, servings);
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-tertiary flex flex-col gap-2">
        <div className="flex justify-between">
          <h4 className="">Serving size:</h4>
          <p className="">{servingSize}</p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="">Number of servings:</h4>
          <input
            type="number"
            className="border-tertiary w-17 text-tertiary rounded-sm border-2 p-1"
            placeholder="1"
            value={servings}
            onChange={handleServingsChange}
            step="any"
            min="0"
            max="99"
          />
        </div>
      </div>
      <div className="sm:min-w-85 w-full">
        <MacrosPieChart
          food={food}
          servings={servings}
          height={100}
          cx="60%"
          innerRadius={30}
          outerRadius={45}
          labelClassName="text-sm"
          legendAlign="left"
          legendWrapperStyle={{ left: "0%" }}
        />
      </div>
      <div className="flex items-center justify-end gap-1 sm:gap-2">
        <button
          type="button"
          className="border-tertiary text-tertiary sm:text-md rounded-4xl h-[26px] border bg-transparent px-2 py-0.5 text-sm font-medium sm:h-[28px]"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`bg-tertiary rounded-4xl ${isActive ? "text-primary-1-light" : "text-tertiary-light"} sm:text-md h-[26px] px-2 py-0.5 text-sm font-medium sm:h-[28px]`}
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}
