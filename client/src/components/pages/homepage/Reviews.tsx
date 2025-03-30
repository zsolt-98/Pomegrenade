import { useRef } from "react";
import { useInView } from "framer-motion";
import ReviewsCard from "./ReviewsCard";

export default function Reviews() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <section className="bg-secondary-light px-5" id="reviews">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
        <h2 className="text-primary-1 mb-10 mt-5 inline-block text-3xl font-semibold lg:mb-20 lg:mt-0 lg:text-5xl">
          Results that speak for themselves
        </h2>
        <div
          className={`h-225 md:h-150 xl:h-200 relative mb-10 w-full px-5 max-xl:max-w-[751px] max-md:max-w-[443px] lg:mb-0 xl:px-0`}
          ref={containerRef}
        >
          <ReviewsCard
            cardClassName={`border-3 border-tertiary absolute  top-8 left-11  md:top-23 md:left-7 xl:top-31 xl:left-11 rotate-[-15deg]`}
            bgColor="bg-tertiary"
            starColor="var(--color-primary-1)"
            pColor="text-tertiary-light"
            pText="Pomegrenade makes tracking so easy! I finally understand what I’m eating, and for the first time, I can see exactly where my calories are going. It’s crazy how much I was underestimating my portions before, but now I have complete control over my diet without feeling restricted."
            hColor="text-tertiary-light"
            hText="Katie P."
            isInView={isInView}
            delay={0}
          />

          <ReviewsCard
            cardClassName={`border-3 border-tertiary absolute top-54 right-10 rotate-[13deg] xl:top-4 xl:left-110 md:top-7 md:left-60 md:rotate-[-4deg]  `}
            bgColor="bg-tertiary-light"
            starColor="var(--color-secondary-orange)"
            pColor="text-tertiary"
            pText="Super intuitive app! I lost 10 pounds without feeling like I was dieting at all. The interface is smooth, adding foods is effortless, and I love how it breaks down my macros in a way that actually makes sense. It’s like having a personal nutrition coach in my pocket!"
            hColor="text-tertiary"
            hText="Leo N."
            isInView={isInView}
            delay={0.3}
          />

          <ReviewsCard
            cardClassName={`border-3 border-tertiary absolute top-88 left-10  rotate-[-14deg] xl:top-27 xl:left-198 md:top-40 md:left-90 md:rotate-[17deg] `}
            bgColor="bg-secondary-orange"
            starColor="var(--color-tertiary)"
            pColor="text-tertiary-light"
            pText="Finally, a calorie tracker that doesn’t feel like a chore! Other apps felt clunky and overwhelming, but Pomegrenade is refreshingly simple while still being powerful. I can log my meals in seconds, see my trends at a glance, and actually stay on track without getting frustrated."
            hColor="text-tertiary-light"
            hText="Mia H."
            isInView={isInView}
            delay={0.6}
          />

          <ReviewsCard
            cardClassName={`border-3 border-tertiary absolute top-124 right-13 rotate-[27deg] xl:top-65 xl:left-50 md:top-60 md:left-30 md:rotate-[-7deg]`}
            bgColor="bg-primary-1"
            starColor="var(--color-tertiary)"
            pColor="text-secondary-light"
            pText="I gained muscle and lost fat at the same time—game changer! I’ve been trying to do a body recomposition for months, but it wasn’t until I started tracking my intake with Pomegrenade that I saw real progress. Now, I feel stronger, leaner, and more in control of my fitness than ever before!"
            hColor="text-secondary-light"
            hText="Finn J."
            isInView={isInView}
            delay={0.9}
          />

          <ReviewsCard
            cardClassName={`border-3 border-tertiary absolute top-164 rotate-[-3deg] left-9 xl:top-85 xl:left-146 md:top-65 md:left-70  md:rotate-[6deg] `}
            bgColor="bg-secondary-light"
            starColor="var(--color-primary-1)"
            pColor="text-tertiary"
            pText="This app helped me stop mindless snacking and hit my goals. I never realized how many calories I was consuming just from little bites here and there. Now, I have a much better awareness of what I’m eating, and I’ve learned to make smarter choices that keep me feeling full and satisfied."
            hColor="text-tertiary"
            hText="Sophia G."
            isInView={isInView}
            delay={1.2}
          />
        </div>
      </div>
    </section>
  );
}
