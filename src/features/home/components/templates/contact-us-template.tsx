import { FaShareAlt } from 'react-icons/fa';
import GetInTouchCard from '../molecules/get-in-touch-card';
import StayInTouchCard from '../molecules/stay-in-touch-card';

export default function ContactUsTemplate() {
  const socialLinks = [
    { icon: <FaShareAlt className="text-xl" />, url: '#' },
    { icon: <FaShareAlt className="text-xl" />, url: '#' },
    { icon: <FaShareAlt className="text-xl" />, url: '#' },
    { icon: <FaShareAlt className="text-xl" />, url: '#' },
    { icon: <FaShareAlt className="text-xl" />, url: '#' },
  ];

  return (
    <div className="flex justify-center items-center p-4 sm:p-8 sm:h-96 h-auto gap-8 relative border-y-2 border-black">
      <main className="flex w-full flex-wrap justify-center lg:gap-24 sm:gap-16 gap-8">
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
