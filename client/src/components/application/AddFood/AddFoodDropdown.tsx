import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { ResultsPagination } from "./ResultsPagination";
import { ServingsView } from "./ServingsView";
import { useLogFood } from "@/context/application/LogFoodContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Input from "@/components/global/shared/Input";

export function AddFoodDropDown() {
  const {
    searchQuery,
    isLoading,
    searchResults,
    currentView,
    handleSearchChange,
    setDebouncedSearchTerm,
    performSearch,
    debouncedSearchTerm,
  } = useLogFood();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [searchQuery, setDebouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch();
    }
  }, [debouncedSearchTerm, performSearch]);

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
              {!isLoading && searchResults.length > 0 ? (
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
