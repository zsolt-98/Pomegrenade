export default function MainDashboard() {
  return (
    <main className="bg-tertiary-light relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex h-full max-w-7xl flex-col">
        <div className="border-tertiary rounded-4xl bg-secondary-light-2 h-[75vh] w-full border-2">
          <form className="h-100 mt-20 w-full bg-white">
            <div className="">
              <h3 className="">Breakfast:</h3>
              <input type="text" placeholder="search for recipies" />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
