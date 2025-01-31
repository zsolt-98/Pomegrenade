import pomegrenadeLogo from "../../assets/pomegrenade-logo-586x245px.png";
import placeholder from "../../assets/placeholder.png";
import Divider from "../SVG/Divider";

export default function Hero() {
  return (
    <main className="bg-tertiary-light relative w-full overflow-hidden pb-20">
      <div className="bg-tertiary-light relative container mx-auto flex flex-col">
        <nav className="bg-tertiary z-20 flex h-24 w-full items-center justify-between rounded-b-4xl px-10">
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

        <div className="relative z-10 mt-20 flex h-full w-full flex-col items-center justify-center gap-20 self-center xl:flex-row">
          <div className="mx-5">
            <h2 className="text-tertiary 3xl:text-3xl text-[4vw] font-semibold md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw]">
              A lightweight
            </h2>
            <h1 className="text-primary-1 3xl:text-8xl text-[10vw] leading-none font-bold text-nowrap md:text-[7.5vw] lg:text-[6.5vw] xl:text-[5.5vw]">
              calorie counter <br /> with a bang.
            </h1>
          </div>
          <div className="mx-5 max-w-160">
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
