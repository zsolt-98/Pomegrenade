import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { useNutritionCalculator } from "../hooks/useNutritionCalculator";
import { Food } from "@/types";

type MacrosPieChartProps = {
  food: Food | null;
  servings: number;
};

export function MacrosPieChart({ food, servings }: MacrosPieChartProps) {
  const {
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
  } = useNutritionCalculator(food, servings);

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

  return (
    <ResponsiveContainer width="100%" height={100}>
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
    </ResponsiveContainer>
  );
}
