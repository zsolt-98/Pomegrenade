import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { Cell, Pie, PieChart } from "recharts";

export function ServingsView() {
  const { selectedFood, handleBackToSearch } = useLogFood();

  if (!selectedFood) return null;

  const data = [
    {
      name: "Carbs",
      value: 14,
      color: "var(--color-tertiary)",
    },
    {
      name: "Fat",
      value: 0.7,
      color: "var(--color-secondary-orange)",
    },
    {
      name: "Protein",
      value: 38.5,
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
            {
              (selectedFood.food_description.split("Per ")[1] || "").split(
                " -",
              )[0]
            }
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
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={50}
            outerRadius={70}
            fill="#82ca9d"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
