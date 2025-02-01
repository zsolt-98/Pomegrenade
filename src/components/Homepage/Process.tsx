import goals from "../../assets/goals-300x300px-bg.png";
import food from "../../assets/food-300x300px-bg.png";
import success from "../../assets/success-300x300px-bg.png";
import ProcessBadge from "./ProcessBadge";

export default function Process() {
  return (
    <section className="bg-tertiary-light pt-0 pb-20 xl:pt-20">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-[908px]">
          <h2 className="text-primary-1 mb-20 inline-block text-center text-3xl font-semibold lg:text-5xl">
            Three step formula for explosive progress
          </h2>
          <div className="flex flex-col items-center justify-between gap-20 md:flex-row md:items-start">
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
    </section>
  );
}
