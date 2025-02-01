import ReviewsCard from "./ReviewsCard";

export default function Reviews() {
  return (
    <section className="bg-secondary-light h-[100vh]">
      <div className="container mx-auto flex justify-center">
        {/* Cards */}
        <div className="relative">
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute left-[-40rem] rotate-[-15deg]"
            bgColor="bg-tertiary"
            starColor="var(--color-primary-1)"
            pColor="text-tertiary-light"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary-light"
            hText="Zsolt N."
          />
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute left-[-20rem] top-[-5rem] rotate-[-3deg]"
            bgColor="bg-tertiary-light"
            starColor="var(--color-secondary)"
            pColor="text-tertiary"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary"
            hText="Zsolt N."
          />
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute left-[1rem] top-[-2rem] rotate-[17deg]"
            bgColor="bg-secondary"
            starColor="var(--color-tertiary)"
            pColor="text-tertiary-light"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary-light"
            hText="Zsolt N."
          />
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute left-[-30rem] rotate-[-7deg] top-[17rem]"
            bgColor="bg-primary-1"
            starColor="var(--color-tertiary)"
            pColor="text-secondary-light"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-secondary-light"
            hText="Zsolt N."
          />
          <ReviewsCard
            cardClassName="absolute border-3 border-tertiary left-[-8.5rem] rotate-[6deg] top-[16rem]"
            bgColor="bg-secondary-light"
            starColor="var(--color-secondary)"
            pColor="text-primary-1"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-primary-1"
            hText="Zsolt N."
          />
        </div>
        {/* Cards */}
      </div>
    </section>
  );
}
