import GetInTouchCard from '../molecules/get-in-touch-card';
import StayInTouchCard from '../molecules/stay-in-touch-card';
import Image from 'next/image';

export default function ContactUsTemplate() {
  const socialLinks = [
    {
      icon: <Image src="/social_links/fb-logo.png" alt="Facebook" width={18} height={18} />,
      url: 'https://www.facebook.com/LaSalleComputerSociety',
    },
    {
      icon: <Image src="/social_links/ig-logo.png" alt="Instagram" width={24} height={24} />,
      url: 'https://www.instagram.com/dlsu_lscs/',
    },
    {
      icon: <Image src="/social_links/linkedin-logo.png" alt="LinkedIn" width={24} height={24} />,
      url: 'https://www.linkedin.com/company/la-salle-computer-society/posts/?feedView=all',
    },
    {
      icon: <Image src="/social_links/tiktok-logo.png" alt="TikTok" width={24} height={24} />,
      url: 'https://www.tiktok.com/@dlsu_lscs',
    },
    {
      icon: <Image src="/social_links/gmail-logo.png" alt="Gmail" width={24} height={24} />,
      url: 'mailto:lscs@dlsu.edu.ph',
    },
  ];

  return (
    <div className="relative z-20 bg-gradient-to-b from-[#003D6F] to-[#041019] flex flex-col items-center justify-center p-6 sm:p-10 sm:h-[28rem] h-auto">
      {/* Dots BG */}
      <div
        className="absolute inset-0 bg-[url('/dots.png')] bg-cover bg-left-top opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at center, black 30%, transparent 90%)',
          zIndex: -1,
        }}
      />
      <main className="flex w-full h-full flex-wrap items-center justify-center lg:gap-24 sm:gap-16 gap-8">
        <GetInTouchCard
          title="Get in touch"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          buttonText="Lorem ipsum dolor"
        />
        <StayInTouchCard
          title="Stay in touch"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          socialLinks={socialLinks}
        />
      </main>
    </div>
  );
}
