import goals from "../../../assets/goals-300x300px-bg.png";
import food from "../../../assets/food-300x300px-bg.png";
import success from "../../../assets/success-300x300px-bg.png";
import ProcessBadge from "./ProcessBadge";
import DividerProcess from "../../global/svg/DividerProcess";

export default function Process() {
  return (
    <section className="bg-tertiary-light relative">
      <div className="container mx-auto flex max-w-7xl justify-center">
        <div className="mx-5 flex w-full flex-col items-center">
          <h2 className="text-primary-1 mb-10 inline-block text-center text-3xl font-semibold lg:mb-20 lg:text-5xl">
            Three step formula for explosive progress
          </h2>
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start lg:gap-20">
            <ProcessBadge
              imgSource={goals}
              heading="Set your goals"
              paragraph="Define your goal — shed fat, gain muscle, or both. Your journey starts now!"
            />
            <ProcessBadge
              imgSource={food}
              heading="Track your food"
              paragraph="Every bite counts! Log your meals and stay on track toward your goals!"
            />
            <ProcessBadge
              imgSource={success}
              heading="Make progress"
              paragraph="Monitor your results and see your hard work translate into real progress."
            />
          </div>
        </div>
      </div>
      <DividerProcess fill="var(--color-secondary-light)" className="" />
    </section>
  );
}
// test
