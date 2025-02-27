import { useLogFood } from "@/context/application/LogFoodContext";
import { AddFoodDropDown } from "./AddFood/AddFoodDropdown";

export default function MainDashboard() {
  const { addedFoods } = useLogFood();

  const calculateDisplayAmount = (
    servingSize: string,
    servings: number,
  ): string => {
    const servingSizeMatch = servingSize.match(/^([\d./]+)?\s*(.*)$/);

    if (!servingSizeMatch) {
      return `${servings} x ${servingSize}`;
    }

    const numericPart = servingSizeMatch[1];
    const unit = servingSizeMatch[2];

    const baseAmount = numericPart.includes("/")
      ? parseFloat(numericPart.split("/")[0]) /
        parseFloat(numericPart.split("/")[1])
      : parseFloat(numericPart);

    return `${baseAmount * servings} ${unit}`;
  };

  const calculateCalories = (
    nutritionData: string,
    servings: number,
  ): number => {
    const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
    return caloriesMatch ? parseFloat(caloriesMatch[1]) * servings : 0;
  };

  return (
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="h-[75vh] w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary h-full divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <div className="w-[25%] py-2">
                <h4 className="">Budget</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Food</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Exercise</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Net</h4>
                <p className="">-</p>
              </div>
            </div>
            <div className="bg-secondary-light flex flex-col">
              <div className="flex items-center justify-between p-2">
                <h3 className="text-primary-1 text-2xl font-semibold">
                  Breakfast: 0
                </h3>
                <div className="relative">
                  <AddFoodDropDown />
                </div>
              </div>
              <div className="bg-secondary-light">
                <div className="bg-tertiary-light m-2 mt-0 rounded-lg">
                  {addedFoods.length > 0 && (
                    <ul className="divide-y-2">
                      {addedFoods.map((food) => {
                        const displayAmount = calculateDisplayAmount(
                          food.servingSize,
                          food.servings,
                        );
                        const calories = calculateCalories(
                          food.food_description || "",
                          food.servings,
                        );
                        return (
                          <li
                            key={food.food_id}
                            className="border-tertiary hover:bg-secondary-light-2 flex cursor-pointer justify-between p-2"
                          >
                            <span className="text-tertiary font-medium">
                              {food.food_name} ({displayAmount})
                            </span>
                            <span className="text-tertiary font-medium">
                              {calories.toFixed(0)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </main>
  );
}
