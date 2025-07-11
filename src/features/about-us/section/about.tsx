export default function About() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-between">
        <div className="flex basis-0.5 flex-col mx-16 space-y-6">
          <div>
            <div className="flex">
              <div className="flex bg-gradient-to-r from-[#DDB518] to-[#AA8B12] text-white font-bold px-4 py-1.5 rounded-lg text-[18px] tracking-wider drop-shadow-2xl ">
                ABOUT US
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-[#003D6F] text-[75px] font-extrabold leading-none text-shadow-2xl drop-shadow-2xl">
              <div>LA SALLE</div>
              <div>COMPUTER</div>
              <div>SOCIETY</div>
            </h1>
          </div>
          <div>
            <p className="text-[18px]">
              is the pioneering organization in the College of Computer Studies now on its 38th year
              of service for the Lasallian community. Developing members to become competent and
              well-rounded Lasallians who are aware of the numerous advances in computer technology.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
