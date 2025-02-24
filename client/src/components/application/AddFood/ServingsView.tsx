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
      <div className="text-primary-1 text-lg font-medium">
        {selectedFood.food_name}
      </div>
    </div>
  );
}
