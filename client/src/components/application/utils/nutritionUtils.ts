import { MacroNutrients } from "@/types";

export const calculateCalories = (
  nutritionData: string,
  servings: number,
): number => {
  const caloriesMatch = nutritionData.match(/Calories:\s+([\d.]+)kcal/);
  return caloriesMatch ? parseFloat(caloriesMatch[1]) * servings : 0;
};

export const calculateDisplayAmount = (
  servingSize: string,
  servings: number,
): string => {
  const servingSizeMatch = servingSize.match(/^([\d./]+)?\s*(.*)$/);

  if (!servingSizeMatch) {
    return `${servings} x ${servingSize}`;
  }

  const numericPart = servingSizeMatch[1];
  const unit = servingSizeMatch[2];

  const baseAmount = numericPart.includes("/")
    ? parseFloat(numericPart.split("/")[0]) /
      parseFloat(numericPart.split("/")[1])
    : parseFloat(numericPart);

  const calculatedAmt = baseAmount * servings;
  const fixedAmt = parseFloat(calculatedAmt.toFixed(2));

  return `${fixedAmt} ${unit}`;
};

// // // // // // //

export const carbCaloriesPerGram = 4;
export const proteinCaloriesPerGram = 4;
export const fatCaloriesPerGram = 9;

export const defaultMacroPercentages = {
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

export const calculateMacroPercentages = (
  calories: number,
  macrosInGrams: MacroNutrients,
) => {
  if (!calories || calories <= 0) {
    return defaultMacroPercentages;
  }

  const totalCarbCalories = macrosInGrams.carbohydrates * carbCaloriesPerGram;
  const totalProteinCalories = macrosInGrams.protein * proteinCaloriesPerGram;
  const totalFatCalories = macrosInGrams.fat * fatCaloriesPerGram;

  return {
    carbohydrates: Math.round((totalCarbCalories / calories) * 100),
    protein: Math.round((totalProteinCalories / calories) * 100),
    fat: Math.round((totalFatCalories / calories) * 100),
  };
};

export const calculateTotalPercentage = (percentages: MacroNutrients) => {
  return percentages.carbohydrates + percentages.protein + percentages.fat;
};
