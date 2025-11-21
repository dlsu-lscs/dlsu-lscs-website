/* eslint-disable @next/next/no-img-element */

interface AboutSectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonText?: string;
}

export default function AboutSection({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  buttonText = 'Learn More',
}: AboutSectionProps) {
  return (
    <main className="w-full max-w-7xl flex mx-auto items-center min-h-screen gap-4 sm:gap-6 lg:gap-8 flex-col md:flex-row">
      <section className="flex flex-col flex-1 min-w-0 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">{title}</h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6">{subtitle}</h2>
        <p className="text-base sm:text-lg lg:text-xl my-4 sm:my-6 text-justify leading-relaxed">
          {description}
        </p>
        <button className="bg-gradient-to-b from-[#1A5D89] to-[#071823] rounded-[10px] px-6 py-2 sm:px-8 sm:py-3 lg:px-9 lg:py-3 w-full sm:w-64 lg:w-56 text-lg sm:text-xl font-medium text-white mx-auto lg:mx-0">
          {buttonText}
        </button>
      </section>
      <section className="flex-1 p-2 sm:p-4 min-w-0 w-full lg:w-auto">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="mx-auto rounded-xl w-full max-w-md lg:max-w-none h-auto"
        />
      </section>
    </main>
  );
}
