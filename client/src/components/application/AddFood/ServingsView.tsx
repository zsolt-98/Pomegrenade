import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";

export function ServingsView() {
  const { selectedFood, handleBackToSearch } = useLogFood();

  if (!selectedFood) return null;

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
    </div>
  );
}
