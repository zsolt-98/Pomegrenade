import { AlertTriangle } from "lucide-react";

export default function AlertSetGoals() {
  return (
    <div className="inline-block">
      <div className="bg-secondary-light-2 border-secondary-orange text-secondary-orange mb-5 flex items-center gap-2 rounded-lg border-2 p-2">
        <div className="">
          <AlertTriangle className="size-6 lg:size-7" />
        </div>
        <div className="max-lg:text-xs">
          <h4 className="font-semibold">Set your goals</h4>
          <h5 className="">
            Define your weight target, daily calorie intake, and macronutrient
            balance to start tracking your progress.
          </h5>
        </div>
      </div>
    </div>
  );
}
