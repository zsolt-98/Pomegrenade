import ReviewsCard from "./ReviewsCard";

export default function Reviews() {
  return (
    <section className="bg-secondary-light h-[100vh]">
      <div className="container mx-auto flex max-w-7xl justify-center">
        {/* Cards */}
        <div className="relative h-200 w-full">
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute top-1/2 left-1/2 transform -translate-x-[calc(50%+20rem)] -translate-y-1/2 rotate-[-15deg]"
            bgColor="bg-tertiary"
            starColor="var(--color-primary-1)"
            pColor="text-tertiary-light"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary-light"
            hText="Zsolt N."
          />
          {/* Card 2 */}
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-3deg]"
            bgColor="bg-tertiary-light"
            starColor="var(--color-secondary)"
            pColor="text-tertiary"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary"
            hText="Zsolt N."
          />
          {/* Card 3 */}
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute top-1/2 left-1/2 transform -translate-x-[calc(50%-20rem)] -translate-y-1/2 rotate-[17deg]"
            bgColor="bg-secondary"
            starColor="var(--color-tertiary)"
            pColor="text-tertiary-light"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary-light"
            hText="Zsolt N."
          />
          {/* Card 4 */}
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute top-1/2 left-1/2 transform -translate-x-[calc(50%+10rem)] -translate-y-[calc(50%-20rem)] rotate-[-7deg]"
            bgColor="bg-primary-1"
            starColor="var(--color-tertiary)"
            pColor="text-secondary-light"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-secondary-light"
            hText="Zsolt N."
          />
          {/* Card 5 */}
          <ReviewsCard
            cardClassName="border-3 border-tertiary absolute top-1/2 left-1/2 transform -translate-x-[calc(50%-10rem)] -translate-y-[calc(50%-20rem)] rotate-[6deg]"
            bgColor="bg-secondary-light"
            starColor="var(--color-primary-1)"
            pColor="text-tertiary"
            pText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam, a suscipit id iste recusandae assumenda vitae odio nulla atque numquam, repellat error adipisci itaque! Illo necessitatibus provident rerum officiis temporibus eum quae vero ab quos recusandae."
            hColor="text-tertiary"
            hText="Zsolt N."
          />
        </div>
        {/* Cards */}
      </div>
    </section>
  );
}
