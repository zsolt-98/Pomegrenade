import placeholder from "../../assets/placeholder.png";
import Divider from "../SVG/Divider";

export default function Hero() {
  return (
    <main className="bg-tertiary-light relative flex min-h-[calc(100vh-6rem)] w-full items-center justify-center overflow-hidden pb-20">
      <div className="bg-tertiary-light relative container mx-auto my-20 flex max-w-7xl flex-col">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-20 self-center xl:flex-row">
          <div className="mx-5">
            <h2 className="text-tertiary 3xl:text-3xl text-[4vw] font-semibold md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw]">
              A lightweight
            </h2>
            <h1 className="text-primary-1 3xl:text-7xl text-[10vw] leading-none font-bold text-nowrap md:text-[7.5vw] lg:text-[6.5vw] xl:text-[5.5vw]">
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
