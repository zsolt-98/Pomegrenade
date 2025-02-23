import { useEffect, useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Input from "../global/shared/Input";

type Food = {
  food_id: string;
  food_name: string;
  food_description: string;
};

export default function MainDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="h-[75vh] w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary h-full divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <div className="w-[25%] py-5">
                <h4 className="">Budget</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-5">
                <h4 className="">Food</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-5">
                <h4 className="">Exercise</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-5">
                <h4 className="">Net</h4>
                <p className="">-</p>
              </div>
            </div>
            <div className="bg-secondary-light flex flex-col">
              <div className="flex items-center justify-between p-5">
                <h3 className="text-primary-1 text-2xl font-semibold">
                  Breakfast: 0
                </h3>
                <div className="relative">
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
                      Add food
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onInteractOutside={(e) => e.preventDefault()}
                      align="end"
                      className="min-w-110 bg-tertiary-light border-tertiary border-2"
                    >
                      <div className="space-y-4">
                        <div className="flex">
                          <Input
                            type="text"
                            placeholder="Search for a food to add"
                            value={searchQuery}
                            onChange={handleSearchChange}
                          />
                          {isLoading && (
                            <div className="ml-2 flex items-center">
                              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-500"></div>
                            </div>
                          )}
                        </div>
                        <div className="min-h-95 relative overflow-y-auto">
                          {searchResults.length > 0 ? (
                            <>
                              <ul className="divide-y">
                                {paginatedResults.map((food) => (
                                  <li key={food.food_id} className="py-0.5">
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
                                  onClick={() =>
                                    setCurrentPage((p) => Math.max(0, p - 1))
                                  }
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
                                    setCurrentPage((p) =>
                                      Math.min(pageCount - 1, p + 1),
                                    )
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
                              <div className="">No results found</div>
                            )
                          )}
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="bg-secondary-light p-5 pt-0">
                <div className="bg-tertiary-light h-20 rounded-lg"></div>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </main>
  );
}
