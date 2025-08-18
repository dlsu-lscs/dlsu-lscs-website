import { TriangleDownIcon } from '@radix-ui/react-icons';
import Lscs39thBg from '../components/39th-lscs-bg';

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col p-8 gap-8 relative">
        {/* Background image with fade effect */}
        <Lscs39thBg />

        {/* TEMPORARY NAV */}
        <nav className="h-12 bg-[#002D57] max-w-[1920px] w-full rounded-xl mx-auto"></nav>
        <main className="flex-1 mask-semicircle p-2 w-full max-w-[1920px] mx-auto gap-2 bg-black/60 rounded-2xl flex flex-col justify-center items-center relative">
          <h2 className="text-[#EDCC46] font-extrabold text-lg sm:text-xl md:text-2xl text-center leading-tight sm:leading-snug mb-2">
            La Salle Computer Society
          </h2>
          <h1 className="mb-8 sm:mb-10 md:mb-12 text-white font-bold text-2xl sm:text-3xl md:text-5xl text-center whitespace-pre-line leading-tight sm:leading-snug">
            {`Living Yesterday's Vision\nSetting Today's Trends\nInspiring Tomorrow's Leaders`}
          </h1>
        </main>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 md:w-40 md:h-20 sm:w-32 sm:h-16 h-10 w-20 flex justify-center items-center bg-yellow-400 rounded-t-full z-10 bg-gradient-to-b from-[#DDB518] to-[#77610D] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
          <TriangleDownIcon className="text-white md:w-24 md:h-24 sm:w-20 sm:h-20 w-16 h-16" />
        </div>
      </div>
    </>
  );
}
