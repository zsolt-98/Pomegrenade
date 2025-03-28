import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";
import { useMediaQuery } from "react-responsive";

export function ResultsPagination() {
  const isUnderSmScreen = useMediaQuery({ maxWidth: 639 });
  const { setCurrentPage, currentPage, searchResults } = useLogFood();
  const itemsPerPage = isUnderSmScreen ? 4 : 5;
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="border-tertiary text-tertiary bg-tertiary-light hover:bg-tertiary hover:text-tertiary-light w-20 rounded-full border-2 px-3 py-1.5"
      >
        Previous
      </Button>
      <span className="text-tertiary text-sm">
        Page {currentPage + 1} of {pageCount}
      </span>
      <Button
        type="button"
        onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
        disabled={currentPage >= pageCount - 1}
        className="border-tertiary text-tertiary bg-tertiary-light hover:bg-tertiary hover:text-tertiary-light w-20 rounded-full border-2 px-3 py-1.5"
      >
        Next
      </Button>
    </div>
  );
}
