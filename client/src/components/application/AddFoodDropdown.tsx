import { useEffect, useState } from "react";
import Input from "../global/shared/Input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";
import { Loader2 } from "lucide-react";

type Food = {
  food_id: string;
  food_name: string;
  food_description: string;
};

type View = "search" | "servings";

export function AddFoodDropDown() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("search");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const itemsPerPage = 7;
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setSearchResults([]);
    }
  };

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food);
    setCurrentView("servings");
  };

  const handleBackToSearch = () => {
    setCurrentView("search");
    setSelectedFood(null);
  };

  useEffect(() => {
    setCurrentPage(0);
    const timeOutId = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchTerm.trim()) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/fatsecret/foods.search",
          {
            params: { search_expression: debouncedSearchTerm },
          },
        );

        const foodResults = response.data.foods.food || [];
        setSearchResults(foodResults);
      } catch (error) {
        console.error("Error searching:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearchTerm) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  function SearchResults() {
    return (
      <ul className="my-2 divide-y">
        {paginatedResults.map((food) => (
          <li
            key={food.food_id}
            className="hover:bg-secondary-light-2 cursor-pointer py-0.5"
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
    );
  }

  function ResultsPagination() {
    return (
      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="bg-tertiary rounded-4xl text-tertiary-light w-20"
        >
          Previous
        </Button>
        <span className="text-tertiary text-sm">
          Page {currentPage + 1} of {pageCount}
        </span>
        <Button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={currentPage >= pageCount - 1}
          className="bg-tertiary rounded-4xl text-tertiary-light w-20"
        >
          Next
        </Button>
      </div>
    );
  }

  function ServingsView() {
    if (!selectedFood) return null;

    return (
      <div className="">
        <Button onClick={handleBackToSearch}>Back to search</Button>
        <div className="">{selectedFood.food_name}</div>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
        Add food
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-120 bg-tertiary-light border-tertiary border-2 p-0"
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
            <div className="mb-0 flex">
              <Input
                type="text"
                placeholder="Search for a food to add"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="min-h-90 relative flex flex-col justify-between">
              {isLoading && (
                <Loader2 className="text-primary-1 absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full" />
              )}
              {searchResults.length > 0 ? (
                <>
                  <SearchResults />
                  <ResultsPagination />
                </>
              ) : (
                searchQuery &&
                !isLoading && (
                  <div className="text-primary-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium">
                    No results found
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-1/2 p-1">
            <ServingsView />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
