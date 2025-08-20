import BackgroundWord from '../components/background-word';

export default function VisionMission() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1/2 flex justify-center">
        <BackgroundWord text="VISION" yOffset="0%" />
        <div
          className="absolute top-0 left-0 w-full h-40 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, white 0%, white 40%,rgba(255, 255, 255, 0.9) 50%,rgba(255, 255, 255, 0.5) 70%, transparent 100%)',
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 flex justify-center">
        <BackgroundWord text="MISSION" yOffset="30%" />
        <div
          className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to top, white 0%, white 40%,rgba(255, 255, 255, 0.9) 50%,rgba(255, 255, 255, 0.5) 70%, transparent 100%)',
          }}
        />
      </div>
      <div className="relative flex flex-1 items-center justify-between px-20 py-20">
        <div className="w-1/2 pr-10">
          <h1 className="text-[48px] font-extrabold mb-4">Our Vision</h1>
          <p className="text-[18px]">
            We envision the La Salle Computer Society to be an organization that, through quality
            assistance and activities, will mold its members academically, socially and spiritually
            in order for them to become competent Lasallian students and well-rounded individuals.
            We also see the organization to be the pioneering student organization of the De La
            Salle University Manila that strongly symbolizes the expertise of the College of
            Computer Studies (CCS) in the field of computer science.
          </p>
        </div>
        <div className="w-1/2 pl-10">
          <h1 className="text-[48px] font-extrabold mb-4">Our Mission</h1>
          <p className="text-[18px]">
            We envision the La Salle Computer Society to be an organization that, through quality
            assistance and activities, will mold its members academically, socially and spiritually
            in order for them to become competent Lasallian students and well-rounded individuals.
            We also see the organization to be the pioneering student organization of the De La
            Salle University Manila that strongly symbolizes the expertise of the College of
            Computer Studies (CCS) in the field of computer science.
          </p>
        </div>
      </div>
    </div>
  );
}
