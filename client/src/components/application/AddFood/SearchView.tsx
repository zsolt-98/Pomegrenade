import Input from "@/components/global/shared/Input";
import { Loader2 } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { ResultsPagination } from "./ResultsPagination";
import { useLogFood } from "@/context/application/LogFoodContext";
import { useEffect } from "react";

export default function SearchView() {
  const {
    searchQuery,
    handleSearchChange,
    searchResults,
    setDebouncedSearchTerm,
    debouncedSearchTerm,
    performSearch,
    isLoading,
  } = useLogFood();

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
    <>
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
    </>
  );
}
