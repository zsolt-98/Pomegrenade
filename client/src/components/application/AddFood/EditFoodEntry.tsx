import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { Food } from "@/types";
import { useState } from "react";
import { useNutritionCalculator } from "../hooks/useNutritionCalculator";
import { MacrosPieChart } from "./MacrosPieChart";

type EditFoodEntryProps = {
  food: Food;
  onClose: () => void;
};

export function EditFoodEntry({ food, onClose }: EditFoodEntryProps) {
  const { updateFood } = useLogFood();
  const [servings, setServings] = useState(food.servings);

  const {
    servingSize,
    // calories,
    // carbsGrams,
    // fatGrams,
    // proteinGrams,
    // carbsCalories,
    // fatCalories,
    // proteinCalories,
    // carbsPercentage,
    // fatPercentage,
    // proteinPercentage,
  } = useNutritionCalculator(food, servings);

  // const chartData = [
  //   {
  //     name: `Carbs: ${carbsGrams}g  (${carbsPercentage}%)`,
  //     value: carbsCalories || 0.01,
  //     color: "var(--color-tertiary)",
  //   },
  //   {
  //     name: `Fat: ${fatGrams}g (${fatPercentage}%)`,
  //     value: fatCalories || 0.01,
  //     color: "var(--color-secondary-orange)",
  //   },
  //   {
  //     name: `Protein: ${proteinGrams}g (${proteinPercentage}%)`,
  //     value: proteinCalories || 0.01,
  //     color: "var(--color-primary-1)",
  //   },
  // ];

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
      <div className="min-w-85">
        <MacrosPieChart food={food} servings={servings} />
        {/* <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="60%"
              cy="50%"
              labelLine={false}
              innerRadius={30}
              outerRadius={45}
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
                className="text-sm font-semibold"
              />
            </Pie>
            <Legend
              verticalAlign="middle"
              layout="vertical"
              align="left"
              wrapperStyle={{ left: "0%" }}
            />
          </PieChart>
        </ResponsiveContainer> */}
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          className="bg-tertiary-light border-tertiary text-tertiary rounded-4xl h-auto border px-3 py-1"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-tertiary rounded-4xl text-tertiary-light h-auto px-3 py-1"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
