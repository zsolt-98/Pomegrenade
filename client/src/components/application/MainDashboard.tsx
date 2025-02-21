// src/components/application/MainDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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

  const itemsPerPage = 7;
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

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

        // Access the nested food array
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
        <div className="border-tertiary rounded-4xl bg-secondary-light-2 h-[75vh] w-full border-2">
          <form className="h-100 mt-20 w-full bg-white p-6">
            <div className="flex justify-between">
              <h3 className="mb-3 text-xl font-semibold">Breakfast:</h3>
              <div className="relative origin-top-right">
                <Dialog>
                  <DialogTrigger className="bg-tertiary rounded-4xl text-tertiary-light p-3">
                    Add food
                  </DialogTrigger>
                  <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle>Search for a food</DialogTitle>
                      {/* <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription> */}
                    </DialogHeader>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="search for foods"
                        className="flex-1 rounded-l border px-4 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isLoading}
                      />
                      {isLoading && (
                        <div className="ml-2 flex items-center">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </div>
                    <div className="">
                      {searchResults.length > 0 ? (
                        <>
                          <ul className="divide-y">
                            {paginatedResults.map((food) => (
                              <li key={food.food_id} className="py-2">
                                <div className="font-medium">
                                  {food.food_name}
                                </div>
                                {food.food_description && (
                                  <div className="text-sm text-gray-500">
                                    {food.food_description}
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>

                          {/* Pagination controls */}
                          <div className="mt-4 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() =>
                                setCurrentPage((p) => Math.max(0, p - 1))
                              }
                              disabled={currentPage === 0}
                              className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
                            >
                              Previous
                            </button>

                            <span className="text-sm">
                              Page {currentPage + 1} of {pageCount}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                setCurrentPage((p) =>
                                  Math.min(pageCount - 1, p + 1),
                                )
                              }
                              disabled={currentPage >= pageCount - 1}
                              className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
                            >
                              Next
                            </button>
                          </div>
                        </>
                      ) : (
                        searchQuery &&
                        !isLoading && <div className="">No results found</div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
