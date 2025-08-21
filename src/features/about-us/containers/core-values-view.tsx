import Image from 'next/image';
import BackgroundWord from '../components/background-word';

export default function CoreValues() {
  return (
    <div className="min-h-screen relative flex items-center justify-between p-8 sm:p-16">
      <Image
        src="/macky1.png"
        alt="macky1"
        width={280}
        height={280}
        className="absolute -top-28 md:-top-36 left-0 w-[200px] md:w-[300px] h-auto z-20 antialiased"
      />
      <Image
        src="/macky2.png"
        alt="macky2"
        width={280}
        height={280}
        className="absolute -top-28 md:-top-36 right-0 w-[200px] md:w-[300px] h-auto z-20 antialiased"
      />
      <div className="absolute top-0 left-0 w-full h-1/2 flex justify-center">
        <BackgroundWord text="CORE" yOffset="0%" />
        <div
          className="absolute top-0 left-0 w-full h-60 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, white 100%)',
          }}
        />
      </div>
    </div>
  );
}
