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
  height: number;
  cx: string;
  innerRadius: number;
  outerRadius: number;
  labelClassName: string;
  legendAlign: "left" | "center" | "right";
  legendWrapperStyle: { [key: string]: string | number };
};

export function MacrosPieChart({
  food,
  servings,
  height,
  cx,
  innerRadius,
  outerRadius,
  labelClassName,
  legendAlign,
  legendWrapperStyle,
}: MacrosPieChartProps) {
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
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx={cx}
          cy="50%"
          labelLine={false}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="var(--color-tertiary)"
          animationDuration={400}
          animationBegin={100}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label
            value={`${calories.toFixed(0)} cal`}
            position="center"
            fill="var(--color-primary-1)"
            className={`font-semibold ${labelClassName}`}
          />
        </Pie>
        <Legend
          verticalAlign="middle"
          layout="vertical"
          align={legendAlign}
          wrapperStyle={legendWrapperStyle}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
