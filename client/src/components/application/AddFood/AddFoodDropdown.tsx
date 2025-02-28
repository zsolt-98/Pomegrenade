import { ServingsView } from "./ServingsView";
import { useLogFood } from "@/context/application/LogFoodContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchView from "./SearchView";
import { useEffect, useRef, useState } from "react";

export function AddFoodDropDown() {
  const { currentView, addedFoods } = useLogFood();

  const [isOpen, setIsOpen] = useState(false);
  const prevFoodsLengthRef = useRef(addedFoods.length);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (addedFoods.length > prevFoodsLengthRef.current && isOpen) {
      setSkipAnimation(true);
      setIsOpen(false);
    }
    prevFoodsLengthRef.current = addedFoods.length;
  }, [addedFoods, isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setSkipAnimation(false);
    }
    setIsOpen(open);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
        Add food
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`w-120 bg-tertiary-light border-tertiary border-2 p-0 ${skipAnimation ? "!animate-none !opacity-0 !transition-none" : ""}`}
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
