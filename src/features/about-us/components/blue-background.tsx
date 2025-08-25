import Image from 'next/image';
import BackgroundNumber from './background-number';

type BlueBackgroundProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  number: string;
};

export default function BlueBackground({
  imageSrc,
  imageAlt,
  title,
  description,
  number,
}: BlueBackgroundProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <BackgroundNumber text={number} yOffset="40%" xOffset="-130%" />
      </div>
      <div className="relative z-10 h-full bg-gradient-to-b from-[#1A5D89] to-[#001E3B] p-6 rounded-lg drop-shadow-2xl shadow-xl text-start">
        <div className="inline-flex items-center justify-center bg-white rounded-xl p-0.2">
          <Image src={imageSrc} alt={imageAlt} width={66} height={66} />
        </div>
        <h1 className="text-[32px] font-bold text-[#EDCC46]">{title}</h1>
        <p className="text-[16px] text-white mb-4">{description}</p>
      </div>
    </div>
  );
}
