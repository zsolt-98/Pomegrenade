import { Food } from "@/types";
import { useMemo } from "react";

export function useNutritionCalculator(food: Food | null, servings: number) {
  return useMemo(() => {
    if (!food) {
      return {
        servingSize: "",
        calories: 0,
        carbsGrams: 0,
        fatGrams: 0,
        proteinGrams: 0,
        carbsCalories: 0,
        fatCalories: 0,
        proteinCalories: 0,
        totalCalories: 0,
        carbsPercentage: 0,
        fatPercentage: 0,
        proteinPercentage: 0,
      };
    }

    const nutritionData = food.food_description || "";
    const servingSize = (nutritionData.split("Per ")[1] || "").split(" -")[0];
    const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
    const carbsMatch = nutritionData.match(/Carbs:\s+([\d.]+)g/);
    const fatMatch = nutritionData.match(/Fat:\s+([\d.]+)g/);
    const proteinMatch = nutritionData.match(/Protein:\s+([\d.]+)g/);

    const baseCalories = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0;
    const baseCarbsGrams = carbsMatch ? parseFloat(carbsMatch[1]) : 0;
    const baseFatGrams = fatMatch ? parseFloat(fatMatch[1]) : 0;
    const baseProteinGrams = proteinMatch ? parseFloat(proteinMatch[1]) : 0;

    const calories = parseFloat((baseCalories * servings).toFixed(1)) || 0;
    const carbsGrams = parseFloat((baseCarbsGrams * servings).toFixed(1)) || 0;
    const fatGrams = parseFloat((baseFatGrams * servings).toFixed(1)) || 0;
    const proteinGrams =
      parseFloat((baseProteinGrams * servings).toFixed(1)) || 0;

    const carbsCalories = parseFloat((carbsGrams * 4).toFixed(1));
    const fatCalories = parseFloat((fatGrams * 9).toFixed(1));
    const proteinCalories = parseFloat((proteinGrams * 4).toFixed(1));
    const totalCalories = carbsCalories + fatCalories + proteinCalories;

    const carbsPercentage =
      Math.round((carbsCalories / totalCalories) * 100) || 0;
    const fatPercentage = Math.round((fatCalories / totalCalories) * 100) || 0;
    const proteinPercentage =
      Math.round((proteinCalories / totalCalories) * 100) || 0;

    return {
      servingSize,
      calories,
      carbsGrams,
      fatGrams,
      proteinGrams,
      carbsCalories,
      fatCalories,
      proteinCalories,
      totalCalories,
      carbsPercentage,
      fatPercentage,
      proteinPercentage,
    };
  }, [food, servings]);
}
