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
import { Food, MealType } from "@/types";

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
  addFood: (
    food: Food,
    servingSize: string,
    servings: number,
    mealType: string,
  ) => void;
  isSavingEntry: boolean;
  resetAddFoodState: () => void;
  deleteFood: (entryId: string) => Promise<void>;
  isDeletingEntry: boolean;
  updateFood: (entryId: string, servingSize: string, servings: number) => void;
  loadUserFoods: () => Promise<void>;
  currentMealType: MealType;
  // setCurrentMealType: (mealType: MealType) => void;
  // selectedDate: Date;
  // setSelectedDate: (date: Date) => void;
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
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [isDeletingEntry, setIsDeletingEntry] = useState(false);
  const [addedFoods, setAddedFoods] = useState<
    Array<Food & { servings: number }>
  >([]);
  const [currentMealType, setCurrentMealType] = useState<MealType>("Breakfast");
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  // const getFoodsByDate = useCallback((mealType: MealType, date: Date) => {
  //   return addedFoods.filter((food) => {
  //     const foodDate = new Date(food.addedAt);
  //     return (
  //       food.mealType === mealType && foodDate.getDate() === date.getDate() && food.getMonth() ===
  //     );
  //   });
  // }, []);

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

  const addFood = async (
    food: Food,
    servingSize: string,
    servings: number,
    mealType: string,
  ) => {
    axios.defaults.withCredentials = true;
    setIsSavingEntry(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/food/add`, {
        food_id: food.food_id,
        food_name: food.food_name,
        food_description: food.food_description,
        servingSize,
        servings,
        mealType,
      });

      if (data.success) {
        setAddedFoods((prev) => [
          ...prev,
          { ...food, servingSize, servings, mealType, ...data.foodEntry },
        ]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred.");
    } finally {
      setIsSavingEntry(false);
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
    setIsDeletingEntry(true);
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
    } finally {
      setIsDeletingEntry(false);
    }
  };

  const updateFood = async (
    entryId: string,
    servingSize: string,
    servings: number,
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.put(`${backendUrl}/api/food/update`, {
        entryId,
        servingSize,
        servings,
      });

      if (data.success) {
        setAddedFoods((prev) =>
          prev.map((food) =>
            food._id === entryId ? { ...food, servingSize, servings } : food,
          ),
        );
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
    isSavingEntry,
    deleteFood,
    isDeletingEntry,
    loadUserFoods,
    updateFood,
    currentMealType,
    setCurrentMealType,
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
