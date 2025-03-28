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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

type AddFoodDropdownProps = {
  mealType: MealType;
};

export function AddFoodDropDown({ mealType }: AddFoodDropdownProps) {
  const { currentView, addedFoods, resetAddFoodState, setCurrentMealType } =
    useLogFood();

  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const prevFoodsLengthRef = useRef(addedFoods.length);

  useEffect(() => {
    if (addedFoods.length > prevFoodsLengthRef.current && isOpen) {
      setIsOpen(false);
    }
    prevFoodsLengthRef.current = addedFoods.length;
  }, [addedFoods, isOpen, resetAddFoodState]);

  useEffect(() => {
    if (!api) return;

    if (currentView === "search") {
      api.scrollTo(0);
    } else if (currentView === "servings") {
      api.scrollTo(1);
    }
  }, [api, currentView]);

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
        <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent text-sm font-medium">
          Add food
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onAnimationEnd={resetAddFoodState}
        align="end"
        className="sm:w-120 bg-tertiary-light border-tertiary w-[calc(100vw-3.75rem)] border-2 p-0"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            dragFree: false,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <SearchView />
            </CarouselItem>
            <CarouselItem>
              <ServingsView />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
