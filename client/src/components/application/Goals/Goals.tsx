import GoalsTable from "./GoalsTable";

export default function Goals() {
  const weightGoalsData = {
    title: "Weight Goals",
    labels: ["Starting weight", "Current weight", "Goal weight", "Weekly goal"],
    values: ["82 kg", "78 kg", "70 kg", "0.5 kg loss"],
  };

  const nutritionGoalsData = {
    title: "Nutrition Goals",
    labels: ["Calories", "Carbohydrates", "Protein", "Fat"],
    values: ["2030", "254g", "102g", "68g"],
  };

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col">
        <div className="my-20 w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <GoalsTable data={weightGoalsData} />
              <GoalsTable data={nutritionGoalsData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
