import { useLogFood } from "@/context/application/LogFoodContext";

// Components/AddFoodDropdown/SearchResults.tsx
export function SearchResults() {
  const { searchResults, handleFoodSelect, currentPage } = useLogFood();
  const itemsPerPage = 7;
  const paginatedResults = searchResults.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <ul className="divide-tertiary my-2 divide-y">
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
            <div className="text-tertiary text-xs">{food.food_description}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
