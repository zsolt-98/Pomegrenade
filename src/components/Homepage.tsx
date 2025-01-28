import pomegrenadeLogo from "../assets/pomegrenade-logo-586x245px.png";
import bang from "../assets/bang-500x340px.png";

export default function Homepage() {
  return (
    <main className="bg-secondary-light h-screen w-full">
      <div className="bg-secondary-light relative container mx-auto h-full">
        <nav className="bg-tertiary absolute h-32 w-full rounded-b-4xl">
          <img src={pomegrenadeLogo} className="h-full p-6" alt="" />
        </nav>
        <div className="flex h-full items-center justify-center">
          <div className="flex">
            <h1 className="text-primary-1 font-display flex items-start justify-center text-7xl font-bold">
              <div className="flex flex-col self-center">
                <span>Calorie</span> <span>counter</span>
              </div>
              <div className="block self-center font-normal">with a</div>
              <div className="">
                <img src={bang} className="h-60 object-contain" />
              </div>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}
