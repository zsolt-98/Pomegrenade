import { Button } from "@/components/ui/button";
import { useLogFood } from "@/context/application/LogFoodContext";

export function ResultsPagination() {
  const { setCurrentPage, currentPage, searchResults } = useLogFood();
  const itemsPerPage = 7;
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
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
        onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
        disabled={currentPage >= pageCount - 1}
        className="bg-tertiary rounded-4xl text-tertiary-light w-20"
      >
        Next
      </Button>
    </div>
  );
}
