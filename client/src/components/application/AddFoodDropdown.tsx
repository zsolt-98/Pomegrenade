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

export function AddFoodDropDown() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 8;
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

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
        Add food
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-120 bg-tertiary-light border-tertiary border-2"
      >
        <div className="space-y-4">
          <div className="mb-0 flex">
            <Input
              type="text"
              placeholder="Search for a food to add"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="min-h-95 relative overflow-y-auto">
            {isLoading && (
              <Loader2 className="text-primary-1 absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full" />
            )}
            {searchResults.length > 0 ? (
              <>
                <ul className="divide-y">
                  {paginatedResults.map((food) => (
                    <li
                      key={food.food_id}
                      className="hover:bg-secondary-light-2 py-0.5"
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
                <div className="absolute bottom-0 left-0 right-0 mt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5"
                  >
                    Previous
                  </Button>
                  <span className="text-tertiary text-sm">
                    Page {currentPage + 1} of {pageCount}
                  </span>
                  <Button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(pageCount - 1, p + 1))
                    }
                    disabled={currentPage >= pageCount - 1}
                    className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5"
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : (
              searchQuery &&
              !isLoading && (
                <div className="text-primary-1 font-medium">
                  No results found
                </div>
              )
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
