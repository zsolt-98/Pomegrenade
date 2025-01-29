import pomegrenadeLogo from "../assets/pomegrenade-logo-586x245px.png";
import placeholder from "../assets/placeholder.png";
import Divider from "./SVG/Divider";

export default function Homepage() {
  return (
    <main className="bg-tertiary-light relative h-screen w-full">
      <div className="bg-tertiary-light relative container mx-auto h-full">
        <nav className="bg-tertiary absolute z-20 flex h-24 w-full items-center justify-between rounded-b-4xl">
          <img src={pomegrenadeLogo} className="h-full p-3" alt="" />
          <div className="flex">
            <button className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal">
              Log in
            </button>
            <button className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal">
              Register
            </button>
          </div>
        </nav>
        <div className="relative z-10 flex h-full items-center justify-center gap-30">
          <div className="">
            <h2 className="text-tertiary text-2xl">A lightweight</h2>
            <h1 className="text-primary-1 text-7xl font-bold">
              calorie counter <br /> with a bang.
            </h1>
          </div>
          <div className="">
            <img
              src={placeholder}
              className="border-tertiary h-120 rounded-4xl border-3"
              alt=""
            />
          </div>
        </div>
      </div>
      <Divider className="absolute top-0" fill="var(--color-secondary-light)" />
    </main>
  );
}
