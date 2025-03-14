import { MacroNutrients } from "@/types";

export const carbCaloriesPerGram = 4;
export const proteinCaloriesPerGram = 4;
export const fatCaloriesPerGram = 9;

export const defaultPercentages = {
  carbohydrates: 50,
  protein: 25,
  fat: 25,
};

export const calculateMacrosInGrams = (
  calories: number,
  percentages: MacroNutrients,
) => {
  if (!calories || calories <= 0) {
    return { carbohydrates: 0, protein: 0, fat: 0 };
  }

  const carbsGrams = Math.round(
    (calories * (percentages.carbohydrates / 100)) / carbCaloriesPerGram,
  );
  const proteinGrams = Math.round(
    (calories * (percentages.protein / 100)) / proteinCaloriesPerGram,
  );
  const fatGrams = Math.round(
    (calories * (percentages.fat / 100)) / fatCaloriesPerGram,
  );

  return {
    carbohydrates: carbsGrams,
    protein: proteinGrams,
    fat: fatGrams,
  };
};
