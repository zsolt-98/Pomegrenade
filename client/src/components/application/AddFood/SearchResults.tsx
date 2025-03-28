import { useLogFood } from "@/context/application/LogFoodContext";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

export function SearchResults() {
  const isUnderSmScreen = useMediaQuery({ maxWidth: 639 });
  const { searchResults, handleFoodSelect, currentPage } = useLogFood();
  const [api, setApi] = useState<CarouselApi>();
  const itemsPerPage = isUnderSmScreen ? 4 : 5;

  const pageCount = Math.ceil(searchResults.length / itemsPerPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentPage);
  }, [api, currentPage]);

  return (
    <Carousel
      opts={{
        watchDrag: false,
        duration: 15,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {pages.map((pageIndex) => {
          const startIndex = pageIndex * itemsPerPage;
          const pageItems = searchResults.slice(
            startIndex,
            startIndex + itemsPerPage,
          );

          return (
            <CarouselItem key={pageIndex} className="w-full">
              <ul className="divide-tertiary w-full divide-y">
                {pageItems.map((food) => (
                  <li
                    key={food.food_id}
                    className="hover:bg-secondary-light-2 cursor-pointer p-2"
                    onClick={() => handleFoodSelect(food)}
                  >
                    <div className="text-primary-1 text-sm font-medium">
                      {food.food_name}
                    </div>
                    {food.food_description && (
                      <div className="text-tertiary text-xs">
                        {food.food_description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
