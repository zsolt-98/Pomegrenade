import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { Cell, Pie, PieChart } from "recharts";

export function ServingsView() {
  const { selectedFood, handleBackToSearch } = useLogFood();

  if (!selectedFood) return null;

  const nutritionData = selectedFood.food_description || "";
  // const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
  const carbsMatch = nutritionData.match(/Carbs:\s+([\d.]+)g/);
  const fatMatch = nutritionData.match(/Fat:\s+([\d.]+)g/);
  const proteinMatch = nutritionData.match(/Protein:\s+([\d.]+)g/);

  // const calories = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0;
  const carbsGrams = carbsMatch ? parseFloat(carbsMatch[1]) : 0;
  const fatGrams = fatMatch ? parseFloat(fatMatch[1]) : 0;
  const proteinGrams = proteinMatch ? parseFloat(proteinMatch[1]) : 0;

  const fatCalories = parseFloat((fatGrams * 9).toFixed(1));
  const carbsCalories = parseFloat((carbsGrams * 4).toFixed(1));
  const proteinCalories = parseFloat((proteinGrams * 4).toFixed(1));

  const chartData = [
    {
      name: "Carbs",
      value: carbsCalories,
      color: "var(--color-tertiary)",
    },
    {
      name: "Fat",
      value: fatCalories,
      color: "var(--color-secondary-orange)",
    },
    {
      name: "Protein",
      value: proteinCalories,
      color: "var(--color-primary-1)",
    },
  ];

  return (
    <div className="p-4">
      <Button
        onClick={handleBackToSearch}
        className="bg-tertiary rounded-4xl text-tertiary-light mb-4"
      >
        Back
      </Button>
      <h3 className="text-primary-1 text-lg font-medium">
        {selectedFood.food_name}
      </h3>
      <div className="">
        <div className="flex justify-between">
          <h4 className="">Serving size:</h4>
          <p className="">
            {(nutritionData.split("Per ")[1] || "").split(" -")[0]}
          </p>
        </div>
        <div className="flex justify-between">
          <h4 className="">Number of servings:</h4>
          <input
            type="number"
            className="border-tertiary w-17 text-tertiary rounded-sm border-2 p-1"
            placeholder="1"
          />
        </div>
      </div>
      <div className="flex">
        <PieChart width={300} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={50}
            outerRadius={70}
            fill="var(--color-tertiary)"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
