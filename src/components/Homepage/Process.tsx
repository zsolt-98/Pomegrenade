import goals from "../../assets/goals-150x150px-bg.png";
import food from "../../assets/food-150x150px-bg.png";
import success from "../../assets/success-150x150px-bg.png";

export default function Process() {
  return (
    <section className="bg-tertiary-light pt-0 pb-20 xl:pt-20">
      <div className="container mx-auto">
        <h2 className="text-primary-1 mb-20 text-center text-3xl font-semibold lg:text-5xl">
          Three step formula for explosive progress
        </h2>
        <div className="flex justify-center gap-20">
          <div className="">
            <img
              className="border-tertiary rounded-full border-3"
              src={goals}
              alt=""
            />
          </div>
          <div className="">
            <img
              className="border-tertiary rounded-full border-3"
              src={food}
              alt=""
            />
          </div>
          <div className="">
            <img
              className="border-tertiary rounded-full border-3"
              src={success}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
