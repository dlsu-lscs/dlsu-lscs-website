import BackgroundWord from '../components/background-word';

export default function VisionMission() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Vision Background */}
      <section className="absolute w-full h-1/2 flex justify-center top-0 md:-top-5 lg:top-0">
        <BackgroundWord text="VISION" yOffset="0%" />
        <div
          className="absolute top-0 left-0 w-full h-20 sm:h-26 md:h-28 lg:h-40 pointer-events-none z-10"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            backgroundColor: 'white',
          }}
        />
      </section>

      {/* Mission Background */}
      <section className="absolute w-full h-1/2 flex justify-center bottom-0 md:-bottom-15 lg:bottom-0">
        <BackgroundWord text="MISSION" yOffset="30%" />
        <div
          className="absolute bottom-0 left-0 w-full h-32 sm:h-40 md:h-50 lg:h-40 pointer-events-none z-10"
          style={{
            WebkitMaskImage:
              'linear-gradient(to top, black 0%, black 40%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            backgroundColor: 'white',
          }}
        />
      </section>

      {/* Content */}
      <section
        className="relative flex flex-col md:flex-row flex-1 items-center justify-between 
                   px-6 py-12 sm:px-10 sm:py-16 md:px-20 md:py-20 gap-8 md:gap-0"
      >
        {/* Vision */}
        <article className="w-full md:w-1/2 md:pr-6 lg:pr-10">
          <h1 className="text-3xl sm:text-4xl md:text-[36px] lg:text-[48px] font-extrabold mb-4">
            Our Vision
          </h1>
          <p className="text-base sm:text-lg md:text-[16px] lg:text-[18px] leading-relaxed">
            We envision the La Salle Computer Society to be an organization that, through quality
            assistance and activities, will mold its members academically, socially and spiritually
            in order for them to become competent Lasallian students and well-rounded individuals.
            We also see the organization to be the pioneering student organization of the De La
            Salle University Manila that strongly symbolizes the expertise of the College of
            Computer Studies (CCS) in the field of computer science.
          </p>
        </article>

        {/* Mission */}
        <article className="w-full md:w-1/2 md:pl-6 lg:pl-10">
          <h1 className="text-3xl sm:text-4xl md:text-[36px] lg:text-[48px] font-extrabold mb-4">
            Our Mission
          </h1>
          <p className="text-base sm:text-lg md:text-[16px] lg:text-[18px] leading-relaxed">
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
