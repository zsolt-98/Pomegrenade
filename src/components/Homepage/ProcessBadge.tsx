interface ProcessBadge {
  imgSource: string;
  heading: string;
  paragraph: string;
}

export default function ProcessBadge({
  imgSource,
  heading,
  paragraph,
}: ProcessBadge) {
  return (
    <div className="flex w-[50%] flex-col text-center md:w-[33%]">
      <img
        className="border-tertiary rounded-full border-3"
        src={imgSource}
        alt=""
      />
      <h3 className="text-primary-1 text-xl font-semibold lg:text-3xl">
        {heading}
      </h3>
      <p className="text-tertiary">{paragraph}</p>
    </div>
  );
}
