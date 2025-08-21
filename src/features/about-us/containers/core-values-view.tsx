import Image from 'next/image';
import BackgroundWord from '../components/background-word';
import BlueBackground from '../components/blue-background';

export default function CoreValues() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between p-8 sm:p-16">
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
      <div className="top-0 flex flex-col items-center justify-center max-w-2xl mx-auto h-full z-30 translate-y-20">
        <h1 className="text-[48px] font-extrabold mb-4">Our Core Values</h1>
        <p className="text-[18px] text-center">
          The La Salle Computer Society shall serve as a venue for the growth and development of its
          member through a three-step course of:
        </p>
      </div>
      <div className="relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-32 mb-26">
        <BlueBackground
          number="1"
          imageSrc="/purpose.png"
          imageAlt="Purpose"
          title="Purpose"
          description="to know and understand the reason behind every act, decision, and endeavor pursued."
        />
        <BlueBackground
          number="2"
          imageSrc="/process.png"
          imageAlt="Process"
          title="Process"
          description="to organize and oversee the entire procedure of every project and make sure that each goes through very necessary step towards the purpose."
        />
        <BlueBackground
          number="3"
          imageSrc="/excellence.png"
          imageAlt="Excellence"
          title="Excellence"
          description="to accomplish our goals in the best way possible and in accordance with the ideals of the organization and of De La Salle University Manila."
        />
      </div>
    </div>
  );
}
