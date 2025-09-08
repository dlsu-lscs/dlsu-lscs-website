import BackgroundWord from '../components/background-word';

export default function VisionMission() {
  return (
    <main className="relative min-h-[480px] sm:min-h-screen flex flex-col">
      <section className="absolute w-full h-1/2 flex justify-center -top-5 sm:top-0">
        <BackgroundWord text="VISION" yOffset="0%" />
        <div
          className="absolute top-0 left-0 w-full h-26 sm:h-28 md:h-40 pointer-events-none z-10"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            backgroundColor: 'white',
          }}
        />
      </section>

      <section className="absolute w-full h-1/2 flex justify-center -bottom-15 sm:bottom-0">
        <BackgroundWord text="MISSION" yOffset="30%" />
        <div
          className="absolute bottom-0 left-0 w-full h-50 sm:h-28 md:h-40 pointer-events-none z-10"
          style={{
            WebkitMaskImage:
              'linear-gradient(to top, black 0%, black 40%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            backgroundColor: 'white',
          }}
        />
      </section>

      <section
        className="relative flex flex-1 items-center justify-between 
                   px-0 py-0 sm:px-10 sm:py-16 md:px-20 md:py-20"
      >
        <article className="w-1/2 pr-3 sm:pr-6 md:pr-10 scale-[0.75] sm:scale-[0.95] md:scale-100">
          <h1 className="text-[26px] sm:text-[36px] md:text-[48px] font-extrabold mb-4">
            Our Vision
          </h1>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
            We envision the La Salle Computer Society to be an organization that, through quality
            assistance and activities, will mold its members academically, socially and spiritually
            in order for them to become competent Lasallian students and well-rounded individuals.
            We also see the organization to be the pioneering student organization of the De La
            Salle University Manila that strongly symbolizes the expertise of the College of
            Computer Studies (CCS) in the field of computer science.
          </p>
        </article>

        <article className="w-1/2 pl-3 sm:pl-6 md:pl-10 scale-[0.75] sm:scale-[0.95] md:scale-100">
          <h1 className="text-[26px] sm:text-[36px] md:text-[48px] font-extrabold mb-4">
            Our Mission
          </h1>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
            We envision the La Salle Computer Society to be an organization that, through quality
            assistance and activities, will mold its members academically, socially and spiritually
            in order for them to become competent Lasallian students and well-rounded individuals.
            We also see the organization to be the pioneering student organization of the De La
            Salle University Manila that strongly symbolizes the expertise of the College of
            Computer Studies (CCS) in the field of computer science.
          </p>
        </article>
      </section>
    </main>
  );
}
