type AwardsCardProps = {
  standing?: string;
  awardCommmittee?: string;
  awardName?: string;
  awardType?: string;
  academicYear?: string;
};

export default function AwardsCard({
  standing,
  awardCommmittee,
  awardName,
  awardType,
  academicYear,
}: AwardsCardProps) {
  return (
    <>
      <div className="bg-[#4A4949] w-[clamp(280px,30vw,405px)] h-[clamp(96px,10vw,140px)] shadow-[12px_12px_28px_rgba(0,0,0,0.18),-2px_-2px_12px_rgba(255,255,255,0.2)] rounded-lg px-3 py-2">
        <div className="flex flex-col justify-between h-full">
          {/* Standing + Committee */}
          <div className="font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg">
            <h1>{standing || '1st-Place'}</h1>
            <h1 className="leading-tight">{awardCommmittee || 'OUTSTANDING PUBLICATION AWARD'}</h1>
          </div>

          {/* Award Name */}
          <div className="font-bold text-[#FEE373] text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <h1>{awardName || 'BITS & BYTES'}</h1>
          </div>

          {/* Award Type + Year */}
          <div className="text-white text-[10px] sm:text-xs md:text-sm flex justify-between">
            <h1 className="truncate max-w-[60%]">{awardType || 'LASALLIAN EXCELLENCE AWARD'}</h1>
            <h1>{academicYear || '2018 - 2019'}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
