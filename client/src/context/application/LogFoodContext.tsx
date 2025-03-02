import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../AppContext";
import { toast } from "react-toastify";

type Food = {
  _id?: string;
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
  deleteFood: (entryId: string) => Promise<void>;
  loadUserFoods: () => Promise<void>;
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
  const { backendUrl } = useContext(AppContext);

  const loadUserFoods = useCallback(async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(`${backendUrl}/api/food/entries`);
      if (data.success) {
        setAddedFoods(data.foodEntries || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  }, [backendUrl]);

  useEffect(() => {
    loadUserFoods();
  }, [loadUserFoods]);

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
        `${backendUrl}/api/fatsecret/foods.search`,
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
  }, [debouncedSearchTerm, backendUrl]);

  const addFood = async (food: Food, servingSize: string, servings: number) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(`${backendUrl}/api/food/add`, {
        food_id: food.food_id,
        food_name: food.food_name,
        food_description: food.food_description,
        servingSize,
        servings,
      });

      if (data.success) {
        setAddedFoods((prev) => [
          ...prev,
          { ...food, servingSize, servings, ...data.foodEntry },
        ]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
  };

  const resetAddFoodState = () => {
    setSearchQuery("");
    setSearchResults([]);
    setCurrentPage(0);
    setDebouncedSearchTerm("");
    setCurrentView("search");
    setSelectedFood(null);
  };

  const deleteFood = async (entryId: string) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.delete(`${backendUrl}/api/food/delete`, {
        data: { entryId },
      });

      if (data.success) {
        setAddedFoods((prev) => prev.filter((food) => food._id !== entryId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    }
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
    deleteFood,
    loadUserFoods,
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
