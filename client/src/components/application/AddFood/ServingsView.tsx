import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { Pie, PieChart } from "recharts";

export function ServingsView() {
  const { selectedFood, handleBackToSearch } = useLogFood();

  if (!selectedFood) return null;

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
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
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>
    </div>
  );
}
