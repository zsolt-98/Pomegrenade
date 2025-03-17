import Input from "@/components/global/shared/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppContext } from "@/context/AppContext";
import { GoalsData, MacroNutrients } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  calculateMacroPercentages,
  calculateMacrosInGrams,
  calculateTotalPercentage,
  defaultMacroPercentages,
} from "../utils/nutritionUtils";

type GoalsTableProps = {
  data: GoalsData;
  refetchGoals: () => void;
};

function EditGoalsModal({ data, refetchGoals }: GoalsTableProps) {
  const { backendUrl } = useContext(AppContext);
  const [formValues, setFormValues] = useState<Record<string, number | string>>(
    data.rawValues || {},
  );
  const isNutritionGoals = data.title === "Nutrition Goals";
  const [isLoading, setIsLoading] = useState(false);
  const [percentages, setPercentages] = useState<MacroNutrients>(
    defaultMacroPercentages,
  );
  const [gramsCalculated, setGramsCalculated] = useState<MacroNutrients>({
    carbohydrates: 0,
    protein: 0,
    fat: 0,
  });
  const [totalPercentage, setTotalPercentage] = useState(100);

  const caloriesChanged = useRef(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      return;
    }

    if (isNutritionGoals && formValues.calories) {
      if (formValues.carbohydrates && formValues.protein && formValues.fat) {
        const macrosInGrams = {
          carbohydrates: Number(formValues.carbohydrates),
          protein: Number(formValues.protein),
          fat: Number(formValues.fat),
        };

        const calculatedPercentages = calculateMacroPercentages(
          Number(formValues.calories),
          macrosInGrams,
        );

        setPercentages(calculatedPercentages);
        setGramsCalculated(macrosInGrams);
      } else {
        const calculatedGrams = calculateMacrosInGrams(
          Number(formValues.calories),
          defaultMacroPercentages,
        );
        setGramsCalculated(calculatedGrams);
        setFormValues((prev) => ({
          ...prev,
          carbohydrates: calculatedGrams.carbohydrates,
          protein: calculatedGrams.protein,
          fat: calculatedGrams.fat,
        }));
      }
    }
    firstRender.current = false;
  }, [
    formValues.calories,
    formValues.carbohydrates,
    formValues.protein,
    formValues.fat,
    isNutritionGoals,
  ]);

  useEffect(() => {
    if (isNutritionGoals) {
      setTotalPercentage(calculateTotalPercentage(percentages));
    }
  }, [percentages, isNutritionGoals]);

  useEffect(() => {
    if (isNutritionGoals && formValues.calories && !caloriesChanged.current) {
      const caloriesValue = Number(formValues.calories);
      const calculatedGrams = calculateMacrosInGrams(
        caloriesValue,
        percentages,
      );

      setGramsCalculated(calculatedGrams);

      setFormValues((prev) => ({
        ...prev,
        carbohydrates: calculatedGrams.carbohydrates,
        protein: calculatedGrams.protein,
        fat: calculatedGrams.fat,
      }));
    }

    caloriesChanged.current = false;
  }, [percentages, isNutritionGoals, formValues.calories]);

  const handleChange = (key: string, value: string): void => {
    if (isNutritionGoals && key === "calories") {
      caloriesChanged.current = true;

      setFormValues((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (value) {
        const newCalories = Number(value);
        const calculatedGrams = calculateMacrosInGrams(
          newCalories,
          percentages,
        );
        setGramsCalculated(calculatedGrams);

        setFormValues((prev) => ({
          ...prev,
          [key]: value,
          carbohydrates: calculatedGrams.carbohydrates,
          protein: calculatedGrams.protein,
          fat: calculatedGrams.fat,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handlePercentageChange = (
    macro: keyof MacroNutrients,
    value: string,
  ) => {
    if (!isNutritionGoals) return;

    const newValue = Number(value);
    if (newValue < 0) return;

    setPercentages((prev) => ({
      ...prev,
      [macro]: newValue,
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    const endpointSuffix =
      data.title === "Weight Goals" ? "weight" : "nutrition";
    const endpoint = `${backendUrl}/api/goals/${endpointSuffix}`;

    try {
      const { data: response } = await axios.put(endpoint, formValues);

      if (response.success) {
        toast.success("Goals updated successfully!");
        refetchGoals();
      } else {
        toast.error(response.message || "Failed to update goals");
      }
    } catch (error) {
      console.error("Error updating goals:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {data.rawValues &&
          Object.keys(data.rawValues).map((key, index) => (
            <div key={key} className="flex items-center justify-between">
              <h4 className="font-semibold">{data.labels[index]}</h4>
              <div className="relative my-1.5 me-4 flex items-center justify-start gap-1 font-semibold">
                {isNutritionGoals && data.labels[index] !== "Calories" && (
                  <p className="min-w-16">
                    {gramsCalculated[key as keyof MacroNutrients]} g
                  </p>
                )}
                {!isNutritionGoals || key === "calories" ? (
                  <Input
                    type="number"
                    className="max-w-21 text-tertiary"
                    value={formValues[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ) : (
                  <Input
                    type="number"
                    className="max-w-21 text-tertiary"
                    value={percentages[key as keyof MacroNutrients]}
                    onChange={(e) =>
                      handlePercentageChange(
                        key as keyof MacroNutrients,
                        e.target.value,
                      )
                    }
                  />
                )}

                {isNutritionGoals && data.labels[index] !== "Calories" && (
                  <p className="absolute right-[-17px]">%</p>
                )}
              </div>
            </div>
          ))}
      </div>
      {isNutritionGoals && (
        <div className="flex flex-col items-start justify-between">
          <p className="text-sm">*Macronutrients must equal 100%</p>
          <p
            className={`${totalPercentage !== 100 ? "text-red-500" : "text-tertiary"} text-2xl font-semibold`}
          >
            {totalPercentage}%
          </p>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <DialogClose className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
          Cancel
        </DialogClose>
        <Button
          className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5"
          onClick={handleUpdate}
          disabled={isLoading || (isNutritionGoals && totalPercentage !== 100)}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </>
  );
}

export default function GoalsTable({ data, refetchGoals }: GoalsTableProps) {
  return (
    <div className="w-[50%]">
      <div className="border-tertiary flex h-[52px] items-center justify-center border-b-2 py-2 leading-none">
        <h4 className="">{data.title}</h4>
      </div>
      <div className="flex h-[calc(100%-52px)] flex-col justify-between p-2">
        <div>
          {data.labels.map((label, i) => (
            <div key={label} className="flex items-center justify-between">
              <h4 className="">{label}</h4>
              <p className="">{data.values[i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Dialog>
            <DialogTrigger className="bg-tertiary rounded-4xl text-tertiary-light px-3 py-1.5">
              Edit
            </DialogTrigger>
            <DialogContent className="bg-secondary-light text-primary-1 border-tertiary border-3">
              <DialogHeader>
                <DialogTitle className="border-b-1 border-tertiary pb-2 text-2xl">
                  Edit goals
                </DialogTitle>
              </DialogHeader>
              <EditGoalsModal data={data} refetchGoals={refetchGoals} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
