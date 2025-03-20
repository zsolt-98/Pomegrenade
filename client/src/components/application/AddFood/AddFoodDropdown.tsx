import { ServingsView } from "./ServingsView";
import { useLogFood } from "@/context/application/LogFoodContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchView from "./SearchView";
import { useEffect, useRef, useState } from "react";
import { MealType } from "@/types";
import { Button } from "@/components/ui/button";

type AddFoodDropdownProps = {
  mealType: MealType;
};

export function AddFoodDropDown({ mealType }: AddFoodDropdownProps) {
  const { currentView, addedFoods, resetAddFoodState, setCurrentMealType } =
    useLogFood();

  const [isOpen, setIsOpen] = useState(false);
  const prevFoodsLengthRef = useRef(addedFoods.length);

  useEffect(() => {
    if (addedFoods.length > prevFoodsLengthRef.current && isOpen) {
      setIsOpen(false);
    }
    prevFoodsLengthRef.current = addedFoods.length;
  }, [addedFoods, isOpen, resetAddFoodState]);

  const handleAddFoodDropdown = (open: boolean) => {
    if (open) {
      setCurrentMealType(mealType);
    }
    setIsOpen(open);
  };

  return (
    <DropdownMenu
      modal={false}
      open={isOpen}
      onOpenChange={handleAddFoodDropdown}
    >
      <DropdownMenuTrigger asChild>
        <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent">
          Add food
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onAnimationEnd={resetAddFoodState}
        align="end"
        className="sm:w-120 bg-tertiary-light border-tertiary w-[calc(100vw-3.75rem)] border-2 p-0"
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform:
              currentView === "servings" ? "translateX(-50%)" : "translateX(0)",
            width: "200%",
          }}
        >
          <div className="w-1/2 p-1">
            <SearchView />
          </div>
          <div className="w-1/2 p-1">
            <ServingsView />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
