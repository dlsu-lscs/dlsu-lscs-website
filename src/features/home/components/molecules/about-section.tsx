import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/animation/scroll-animation';

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
  buttonText = 'Learn more',
}: AboutSectionProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6 lg:gap-8 md:flex-row md:items-center md:min-h-screen px-4">
      <ScrollAnimation className="flex-1 min-w-0">
        <section className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h2>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6">{subtitle}</h3>
          <p className="text-base sm:text-lg lg:text-xl my-4 sm:my-6 text-justify leading-relaxed">
            {description}
          </p>
          <Link
            href="/about-us"
            className="flex justify-center items-center bg-linear-to-b from-[#1A5D89] to-[#071823] hover:from-[#2173a9] hover:to-[#0f2838] transition-[transform,background-color,box-shadow] will-change-transform duration-300 transform hover:scale-[1.05] active:scale-[0.97] hover:shadow-lg rounded-[10px] px-6 py-2 sm:px-8 sm:py-3 lg:px-9 lg:py-3 w-full sm:w-64 lg:w-56 text-lg sm:text-xl font-medium text-white mx-auto lg:mx-0 hover:cursor-pointer shadow-md text-center"
          >
            {buttonText}
          </Link>
        </section>
      </ScrollAnimation>

      <ScrollAnimation className="flex-1 w-full min-w-0" delay={0.15}>
        <section className="p-2 sm:p-4 lg:w-auto">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={1200}
            height={900}
            className="mx-auto h-auto w-full max-w-md rounded-xl lg:max-w-none"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </section>
      </ScrollAnimation>
    </main>
  );
}
