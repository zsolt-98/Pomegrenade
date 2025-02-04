import { ButtonHollowPillProps } from "../../types";
import DividerReviews from "../SVG/DividerReviews";

function ButtonHollowPillGetStarted({ children }: ButtonHollowPillProps) {
  return (
    <button className="border-tertiary text-tertiary hover:bg-tertiary hover:text-tertiary-light rounded-full border-2 px-5 py-2 text-2xl font-normal">
      {children}
    </button>
  );
}

export default function GetStarted() {
  return (
    <section className="bg-tertiary-light">
      <DividerReviews fill="var(--color-secondary-light)" />
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center py-20 text-center">
        <h2 className="text-primary-1 mb-10 inline-block text-3xl font-semibold lg:text-5xl">
          Get started now!
        </h2>
        <div className="flex gap-3">
          <ButtonHollowPillGetStarted children="Log In" />
          <ButtonHollowPillGetStarted children="Register" />
        </div>
      </div>
    </section>
  );
}
