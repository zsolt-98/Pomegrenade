import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

type Food = {
  food_id: string;
  food_name: string;
  food_description: string;
  servingSize: string;
  servings: number;
};

type View = "search" | "servings";

interface LogFoodContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchResults: Food[];
  setSearchResults: (results: Food[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  debouncedSearchTerm: string;
  setDebouncedSearchTerm: (term: string) => void;
  currentView: View;
  setCurrentView: (view: View) => void;
  selectedFood: Food | null;
  setSelectedFood: (food: Food | null) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFoodSelect: (food: Food) => void;
  handleBackToSearch: () => void;
  performSearch: () => Promise<void>;
  addedFoods: Food[];
  addFood: (food: Food, servingSize: string, servings: number) => void;
  resetAddFoodState: () => void;
}

export const LogFoodContext = createContext<LogFoodContextType | undefined>(
  undefined,
);

export const LogFoodContextProvider = ({ children }: PropsWithChildren) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<View>("search");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [addedFoods, setAddedFoods] = useState<
    Array<Food & { servings: number }>
  >([]);

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

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food);
    setCurrentView("servings");
  };

  const handleBackToSearch = () => {
    setCurrentView("search");
    setSelectedFood(null);
  };

  const performSearch = useCallback(async () => {
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
      console.log(foodResults);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

  const addFood = (food: Food, servingSize: string, servings: number) => {
    setAddedFoods((prev) => [...prev, { ...food, servings, servingSize }]);
  };

  const resetAddFoodState = () => {
    setSearchQuery("");
    setSearchResults([]);
    setCurrentPage(0);
    setDebouncedSearchTerm("");
    setCurrentView("search");
    setSelectedFood(null);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading,
    searchResults,
    setSearchResults,
    currentPage,
    setCurrentPage,
    debouncedSearchTerm,
    setDebouncedSearchTerm,
    currentView,
    setCurrentView,
    selectedFood,
    setSelectedFood,
    handleSearchChange,
    handleFoodSelect,
    handleBackToSearch,
    performSearch,
    addedFoods,
    addFood,
    resetAddFoodState,
  };

  return (
    <LogFoodContext.Provider value={value}>{children}</LogFoodContext.Provider>
  );
};
export const useLogFood = () => {
  const context = React.useContext(LogFoodContext);
  if (context === undefined) {
    throw new Error("useLogFood must be used within a LogFoodContextProvider");
  }
  return context;
};
