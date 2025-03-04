import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { useState } from "react";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { useNutritionCalculator } from "../hooks/useNutritionCalculator";

export function ServingsView() {
  const { selectedFood, handleBackToSearch, addFood, isSavingEntry } =
    useLogFood();
  const [servings, setServings] = useState(1);

  const {
    servingSize,
    calories,
    carbsGrams,
    fatGrams,
    proteinGrams,
    carbsCalories,
    fatCalories,
    proteinCalories,
    carbsPercentage,
    fatPercentage,
    proteinPercentage,
  } = useNutritionCalculator(selectedFood, servings);

  if (!selectedFood) return null;

  const chartData = [
    {
      name: `Carbs: ${carbsGrams}g  (${carbsPercentage}%)`,
      value: carbsCalories || 0.01,
      color: "var(--color-tertiary)",
    },
    {
      name: `Fat: ${fatGrams}g (${fatPercentage}%)`,
      value: fatCalories || 0.01,
      color: "var(--color-secondary-orange)",
    },
    {
      name: `Protein: ${proteinGrams}g (${proteinPercentage}%)`,
      value: proteinCalories || 0.01,
      color: "var(--color-primary-1)",
    },
  ];

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setServings(Math.min(value, 99));
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Button
          onClick={handleBackToSearch}
          className="bg-tertiary rounded-4xl text-tertiary-light mb-4"
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
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="45%"
              cy="50%"
              labelLine={false}
              innerRadius={40}
              outerRadius={55}
              fill="var(--color-tertiary)"
              animationDuration={500}
              animationBegin={100}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                value={`${calories.toFixed(0)} cal`}
                position="center"
                fill="var(--color-primary-1)"
                className="text-md font-semibold"
              />
            </Pie>
            <Legend
              verticalAlign="middle"
              layout="vertical"
              align="right"
              wrapperStyle={{ right: "17%" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="button"
          className="bg-tertiary rounded-4xl text-tertiary-light w-20"
          onClick={() => addFood(selectedFood, servingSize, servings)}
          disabled={isSavingEntry}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
