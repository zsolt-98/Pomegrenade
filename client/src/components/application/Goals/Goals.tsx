export default function Goals() {
  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col">
        <div className="my-20 w-full">
          <div className="rounded-4xl border-tertiary divide-tertiary divide-y-2 border-2">
            <div className="bg-secondary-light rounded-b-4xl flex leading-none">
              <div className="h-100 w-full">
                <h3 className="text-primary-1 text-xl font-semibold">Weight</h3>
                <div className="flex items-center justify-between">
                  <h4 className="">Starting weight</h4>
                  <input
                    type="number"
                    className="border-tertiary w-17 text-tertiary rounded-sm border-2 p-1"
                  />
                </div>
              </div>
              <div className="h-100 w-full">
                <h3 className="text-primary-1 text-xl font-semibold">
                  Nutrition
                </h3>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
