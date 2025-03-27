import { useCallback, useContext, useEffect, useState } from "react";
import GoalsTable from "./GoalsTable";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import { GoalsData } from "@/types";
import { useNavigate } from "react-router";
import { AlertVerifyEmail } from "../User/AlertVerifyEmail";

type GoalsResponse = {
  weightGoals: GoalsData;
  nutritionGoals: GoalsData;
};

export default function Goals() {
  const { backendUrl, isLoggedin, isAuthLoading } = useContext(AppContext);
  const [goals, setGoals] = useState<GoalsResponse | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("Login state:", isLoggedin);
    if (!isLoggedin && !isAuthLoading) {
      navigate("/");
    }
  }, [isLoggedin, navigate, isAuthLoading]);

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
    if (isLoggedin) {
      fetchGoals();
    }
  }, [fetchGoals, isLoggedin]);

  const weightGoalsData = goals?.weightGoals || defaultGoals.weightGoals;
  const nutritionGoalsData =
    goals?.nutritionGoals || defaultGoals.nutritionGoals;

  return (
    <main className="bg-tertiary-light relative flex w-full flex-grow items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-grow flex-col px-5 2xl:px-0">
        <div className="my-5 w-full sm:my-20">
          <div className="flex w-full justify-center">
            <AlertVerifyEmail />
          </div>
          <div className="rounded-4xl border-tertiary divide-tertiary bg-secondary-light border-2">
            <div className="divide-tertiary bg-secondary-light rounded-4xl text-primary-1 flex flex-col justify-between divide-y-2 text-center text-lg font-semibold sm:flex-row sm:divide-x-2 sm:divide-y-0">
              {isloading ? (
                <div className="">Loading...</div>
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
