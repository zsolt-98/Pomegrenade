// src/components/application/MainDashboard.tsx
import { useState } from "react";
import axios from "axios";

export default function MainDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error searching:", error);
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
              <div className="flex">
                {/* <input
                  type="text"
                  placeholder="search for foods"
                  className="flex-1 rounded-l border px-4 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="rounded-r bg-blue-500 px-6 py-2 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button> */}
                <button className="bg-tertiary rounded-4xl text-tertiary-light p-3">
                  Add food
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
