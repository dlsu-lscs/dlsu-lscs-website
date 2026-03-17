interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface StayInTouchCardProps {
  title: string;
  description: string;
  socialLinks: SocialLink[];
}

export default function StayInTouchCard({ title, description, socialLinks }: StayInTouchCardProps) {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-onest text-[#DDB518]">
        {title}
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF] font-geist font-normal">
        {description}
      </p>
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-300 flex justify-center items-center hover:bg-gray-400 transition text-sm sm:text-base"
            aria-label="Social media link"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
