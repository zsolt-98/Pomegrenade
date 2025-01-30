import pomegrenadeLogo from "../assets/pomegrenade-logo-586x245px.png";
import placeholder from "../assets/placeholder.png";
import Divider from "./SVG/Divider";

export default function Homepage() {
  return (
    <main className="bg-tertiary-light relative min-h-screen w-full overflow-hidden">
      <div className="bg-tertiary-light relative container mx-auto">
        <nav className="bg-tertiary absolute z-20 flex h-24 w-full items-center justify-between rounded-b-4xl px-10">
          <img src={pomegrenadeLogo} className="h-full py-3" alt="" />
          <div className="flex gap-20">
            <a href="" className="text-secondary-light text-xl">
              Process
            </a>
            <a href="" className="text-secondary-light text-xl">
              Reviews
            </a>
            <a href="" className="text-secondary-light text-xl">
              Help
            </a>
          </div>
          <div className="flex gap-2">
            <button className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal">
              Log in
            </button>
            <button className="border-secondary-light text-secondary-light hover:bg-secondary-light hover:text-tertiary rounded-full border-2 px-3 py-1 font-normal">
              Register
            </button>
          </div>
        </nav>
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-30 pt-24 xl:flex-row">
          <div className="mx-5 pt-30 xl:pt-0">
            <h2 className="text-tertiary text-xl font-semibold sm:text-2xl lg:text-3xl">
              A lightweight
            </h2>
            <h1 className="text-primary-1 text-5xl font-bold text-nowrap sm:text-6xl lg:text-7xl">
              calorie counter <br /> with a bang.
            </h1>
          </div>
          <div className="mx-5 pt-0 xl:pt-30">
            <img
              src={placeholder}
              className="border-tertiary w-full rounded-4xl border-3"
              alt=""
            />
          </div>
        </div>
      </div>
      <Divider className="absolute top-0" fill="var(--color-secondary-light)" />
    </main>
  );
}
