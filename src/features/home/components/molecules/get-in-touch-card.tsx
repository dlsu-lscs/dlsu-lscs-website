interface GetInTouchProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function GetInTouchCard({ title, description, buttonText }: GetInTouchProps) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
      <p className="text-xs sm:text-sm md:text-base">{description}</p>
      <button className="self-start bg-gray-300 px-6 sm:px-8 md:px-10 py-2 font-medium text-sm sm:text-base md:text-lg lg:text-xl">
        {buttonText}
      </button>
    </section>
  );
}
