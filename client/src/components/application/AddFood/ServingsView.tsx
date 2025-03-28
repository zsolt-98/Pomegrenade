import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { useState } from "react";
import { useNutritionCalculator } from "../hooks/useNutritionCalculator";
import { MacrosPieChart } from "./MacrosPieChart";
import { useMediaQuery } from "react-responsive";

export function ServingsView() {
  const {
    selectedFood,
    handleBackToSearch,
    addFood,
    isSavingEntry,
    currentMealType,
  } = useLogFood();
  const [servings, setServings] = useState(1);
  const isUnderSmScreen = useMediaQuery({ maxWidth: 639 });

  const { servingSize } = useNutritionCalculator(selectedFood, servings);

  if (!selectedFood) return null;

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setServings(Math.min(value, 99));
  };

  return (
    <div className="flex h-full flex-col justify-between p-2">
      <div>
        <Button
          onClick={handleBackToSearch}
          className="border-tertiary text-tertiary bg-tertiary-light hover:bg-tertiary hover:text-tertiary-light mb-4 rounded-full border-2 px-3 py-1.5"
        >
          Back
        </Button>
      </div>
      <h3 className="text-primary-1 border-tertiary border-b-1 pb-3 text-lg font-semibold">
        {selectedFood.food_name}
      </h3>
      <div className="text-tertiary flex flex-col gap-3">
        <div className="mt-3 flex justify-between">
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
      <div className="w-full">
        <MacrosPieChart
          food={selectedFood}
          servings={servings}
          height={150}
          cx="45%"
          innerRadius={40}
          outerRadius={55}
          labelClassName="text-md"
          legendAlign="right"
          legendWrapperStyle={
            isUnderSmScreen ? { right: "0%" } : { right: "17%" }
          }
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="button"
          className="border-tertiary text-tertiary bg-tertiary-light hover:bg-tertiary hover:text-tertiary-light rounded-full border-2 px-3 py-1.5"
          onClick={() =>
            addFood(selectedFood, servingSize, servings, currentMealType)
          }
          disabled={isSavingEntry}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
