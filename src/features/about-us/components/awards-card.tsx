import { CmsAward } from '../types/awards';

type AwardsCardProps = CmsAward;

export default function AwardsCard({ rank, awardName, projectName, year }: AwardsCardProps) {
  return (
    <>
      <div className="bg-[#4A4949] w-[clamp(280px,30vw,405px)] shadow-[12px_12px_28px_rgba(0,0,0,0.18),-2px_-2px_12px_rgba(255,255,255,0.2)] rounded-lg px-3 py-2">
        <div className="flex flex-col justify-between h-full space-y-3">
          {/* Rank */}
          <div className="font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg">
            <h1>{rank}</h1>
          </div>

          {/* Award Name */}
          <div className="font-bold text-[#FEE373] text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <h1>{awardName}</h1>
          </div>

          {/* Project Name + Year */}
          <div className="text-white text-[10px] sm:text-xs md:text-sm flex justify-between">
            <h1 className="truncate max-w-[60%]">{projectName}</h1>
            <h1>{year}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
