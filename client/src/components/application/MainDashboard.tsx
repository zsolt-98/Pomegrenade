import Meal from "./AddFood/Meal";

export default function MainDashboard() {
  return (
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="h-[75vh] w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary h-full divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <div className="w-[25%] py-2">
                <h4 className="">Budget</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Food</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Exercise</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2">
                <h4 className="">Net</h4>
                <p className="">-</p>
              </div>
            </div>
            <Meal />
            <Meal />
            <Meal />
            <Meal />
            <div className=""></div>
          </div>
        </div>
      </div>
    </main>
  );
}
