import pomegrenadeLogo from "../assets/pomegrenade-logo-586x245px.png";

export default function Homepage() {
  return (
    <main className="bg-secondary-light h-screen w-full">
      <div className="bg-secondary-light relative container mx-auto h-full">
        <nav className="bg-tertiary absolute h-32 w-full rounded-b-4xl">
          <img src={pomegrenadeLogo} className="h-full p-6" alt="" />
        </nav>
        <div className="flex h-full items-center justify-center">
          <h1 className="text-primary-1 font-display text-7xl font-bold">
            Calorie counter <br /> with a bang.
          </h1>
        </div>
      </div>
    </main>
  );
}
