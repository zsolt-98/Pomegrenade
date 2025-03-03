import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { Food } from "@/types";
import { PieChart } from "lucide-react";
import { useState } from "react";
import { Cell, Label, Legend, Pie, ResponsiveContainer } from "recharts";

type EditFoodEntryProps = {
  food: Food;
  onClose: () => void;
};

export function EditFoodEntry({ food, onClose }: EditFoodEntryProps) {
  const { updateFood } = useLogFood();
  const [servings, setServings] = useState(food.servings);

  const nutritionData = food.food_description || "";
  const servingSize = (nutritionData.split("Per ")[1] || "").split(" -")[0];
  const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
  const carbsMatch = nutritionData.match(/Carbs:\s+([\d.]+)g/);
  const fatMatch = nutritionData.match(/Fat:\s+([\d.]+)g/);
  const proteinMatch = nutritionData.match(/Protein:\s+([\d.]+)g/);

  const baseCalories = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0;
  const baseCarbsGrams = carbsMatch ? parseFloat(carbsMatch[1]) : 0;
  const baseFatGrams = fatMatch ? parseFloat(fatMatch[1]) : 0;
  const baseProteinGrams = proteinMatch ? parseFloat(proteinMatch[1]) : 0;

  const calories = parseFloat((baseCalories * servings).toFixed(1)) || 0;
  const carbsGrams = parseFloat((baseCarbsGrams * servings).toFixed(1)) || 0;
  const fatGrams = parseFloat((baseFatGrams * servings).toFixed(1)) || 0;
  const proteinGrams =
    parseFloat((baseProteinGrams * servings).toFixed(1)) || 0;

  const carbsCalories = parseFloat((carbsGrams * 4).toFixed(1));
  const fatCalories = parseFloat((fatGrams * 9).toFixed(1));
  const proteinCalories = parseFloat((proteinGrams * 4).toFixed(1));
  const totalCalories = carbsCalories + fatCalories + proteinCalories;

  const carbsPercentage =
    Math.round((carbsCalories / totalCalories) * 100) || 0;
  const fatPercentage = Math.round((fatCalories / totalCalories) * 100) || 0;
  const proteinPercentage =
    Math.round((proteinCalories / totalCalories) * 100) || 0;

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

  const handleUpdate = () => {
    if (food._id) {
      updateFood(food._id, servingSize, servings);
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <h3 className="text-primary-1 border-tertiary border-b-1 pb-2 text-base font-semibold">
        Edit {food.food_name}
      </h3>
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
      <div className="w-full">
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="45%"
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
              align="right"
              wrapperStyle={{ right: "15%" }}
            />
          </PieChart>
        </ResponsiveContainer>
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
