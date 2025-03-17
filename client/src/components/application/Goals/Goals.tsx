import { useCallback, useContext, useEffect, useState } from "react";
import GoalsTable from "./GoalsTable";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import { GoalsData } from "@/types";

type GoalsResponse = {
  weightGoals: GoalsData;
  nutritionGoals: GoalsData;
};

export default function Goals() {
  const { backendUrl } = useContext(AppContext);
  const [goals, setGoals] = useState<GoalsResponse | null>(null);
  const [isloading, setIsLoading] = useState(true);

  const defaultGoals = {
    weightGoals: {
      title: "Weight Goals",
      labels: ["Starting weight", "Current weight", "Goal weight"],
      values: ["82 kg", "78 kg", "70 kg"],
    },
    nutritionGoals: {
      title: "Nutrition Goals",
      labels: ["Calories", "Carbohydrates", "Protein", "Fat"],
      values: ["2030", "254g", "102g", "68g"],
    },
  };

  const fetchGoals = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: apiResponse } = await axios.get(
        `${backendUrl}/api/goals/get`,
      );

      if (apiResponse.success) {
        setGoals(apiResponse.data);
      } else {
        toast.error(apiResponse.message || "Failed to fetch goals");
      }
    } catch (error) {
      console.log(error); // Temporary
      toast.error("An error has occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const weightGoalsData = goals?.weightGoals || defaultGoals.weightGoals;
  const nutritionGoalsData =
    goals?.nutritionGoals || defaultGoals.nutritionGoals;

  return (
    <main className="bg-tertiary-light relative w-full flex-grow items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col">
        <div className="my-20 w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary bg-secondary-light border-2">
            <div className="divide-tertiary bg-secondary-light rounded-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              {isloading ? (
                <div className=""></div>
              ) : (
                <>
                  <GoalsTable
                    data={weightGoalsData}
                    refetchGoals={fetchGoals}
                  />
                  <GoalsTable
                    data={nutritionGoalsData}
                    refetchGoals={fetchGoals}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
