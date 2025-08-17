import AwardsCard from '../components/awards-card';

export default function AwardsRecognitionView() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#003D6F] to-[#041019] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-10">
          <h1 className="text-[#FEE373] font-bold text-5xl text-center drop-shadow-2xl text-shadow-2xl">
            Awards <span className="text-[#003D6F]">&</span> Recognition
          </h1>
          <p className="text-center text-[#FFFF] text-lg w-[540px] h-[186px]">
            The La Salle Computer Society shall serve as a venue for the growth and development of
            its member through a three-step course of:
          </p>
        </div>
        <main>
          <AwardsCard />
        </main>
      </div>
    </>
  );
}
