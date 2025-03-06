import Meal from "./AddFood/Meal";

export default function MainDashboard() {
  return (
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="h-[75vh] w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
            <div className="divide-tertiary bg-secondary-light rounded-t-4xl text-primary-1 flex justify-between divide-x-2 text-center text-lg font-semibold">
              <div className="w-[25%] py-2 leading-none">
                <h4 className="">Budget</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2 leading-none">
                <h4 className="">Food</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2 leading-none">
                <h4 className="">Exercise</h4>
                <p className="">-</p>
              </div>
              <div className="w-[25%] py-2 leading-none">
                <h4 className="">Net</h4>
                <p className="">-</p>
              </div>
            </div>
            <Meal mealTypeHeading="Breakfast" />
            <Meal mealTypeHeading="Lunch" />
            <Meal mealTypeHeading="Dinner" />
            <Meal mealTypeHeading="Snacks" />
            <div className="bg-secondary-light rounded-b-4xl leading-none">
              <div className="flex h-[52px] justify-end">
                <a href="https://www.fatsecret.com">
                  <img
                    src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png"
                    srcSet="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x"
                    style={{ border: 0 }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
