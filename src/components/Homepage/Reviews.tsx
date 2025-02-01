import ReviewsCard from "./ReviewsCard";

export default function Reviews() {
  return (
    <section className="bg-secondary-light h-[100vh]">
      <div className="container mx-auto flex justify-center">
        {/* Card */}
        <ReviewsCard
          bgColor="bg-tertiary"
          starColor="var(--color-primary-1)"
          pColor="text-secondary-light"
        />
        {/* Card */}
      </div>
    </section>
  );
}
