export interface SVGProps {
  size?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

export interface ButtonHollowPillProps {
  children: string;
  navigateTo?: string;
}

export type OTPFormInputs = {
  otp: string;
};

export type Food = {
  _id?: string;
  food_id: string;
  food_name: string;
  food_description: string;
  servingSize: string;
  servings: number;
  mealType: string;
  addedAt: Date;
};

export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export type GoalsData = {
  title: string;
  labels: string[];
  values: string[];
  rawValues?: {
    [key: string]: number;
  };
};

export type MacroNutrients = {
  carbohydrates: number;
  protein: number;
  fat: number;
};
