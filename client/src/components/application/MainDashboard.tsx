// src/components/application/MainDashboard.tsx
import { useState } from "react";
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/fatsecret/foods.search",
        {
          params: { search_expression: searchQuery },
        },
      );

      // Access the nested food array
      const foodResults = response.data.foods.food || [];
      setSearchResults(foodResults);
      console.log("Search results:", foodResults);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="border-tertiary rounded-4xl bg-secondary-light-2 h-[75vh] w-full border-2">
          <form
            onSubmit={handleSearch}
            className="h-100 mt-20 w-full bg-white p-6"
          >
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
                      <button
                        type="button"
                        className="rounded-r bg-blue-500 px-6 py-2 text-white"
                        disabled={isLoading}
                        onClick={handleSearch}
                      >
                        {isLoading ? "Searching..." : "Search"}
                      </button>
                    </div>
                    <div className="">
                      {searchResults.length > 0 ? (
                        <ul>
                          {searchResults.map((food) => (
                            <li key={food.food_id}>
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
