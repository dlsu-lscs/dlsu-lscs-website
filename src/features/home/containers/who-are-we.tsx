import Lscs39thBg from '../components/39th-lscs-bg';

/* eslint-disable @next/next/no-img-element */
export default function WhoAreWe() {
  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
        <Lscs39thBg />
        <main className="w-full max-w-7xl flex mx-auto items-center min-h-screen gap-4 sm:gap-6 lg:gap-8 flex-col md:flex-row">
          <section className="flex flex-col flex-1 min-w-0 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">WHO ARE WE?</h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6">
              La Salle Computer Society
            </h2>
            <p className="text-base sm:text-lg lg:text-xl my-4 sm:my-6 text-justify leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra, eros nec
              commodo semper, massa ipsum consequat risus, non efficitur tellus orci id nunc.
              Praesent nec eros cursus, pellentesque libero eu, finibus tortor. Ut at odio eu turpis
              sollicitudin tincidunt. Nulla pellentesque, augue cursus pretium laoreet, velit dui
              mollis felis, ac efficitur quam erat id massa.
            </p>
            <button className="bg-gradient-to-b from-[#1A5D89] to-[#071823] rounded-[10px] px-6 py-2 sm:px-8 sm:py-3 lg:px-9 lg:py-3 w-full sm:w-64 lg:w-56 text-lg sm:text-xl font-medium text-white mx-auto lg:mx-0">
              Learn More
            </button>
          </section>
          <section className="flex-1 p-2 sm:p-4 min-w-0 w-full lg:w-auto">
            <img
              src={'https://blocks.astratic.com/img/general-img-square.png'}
              alt="Placeholder network illustration"
              className="mx-auto rounded-xl w-full max-w-md lg:max-w-none h-auto"
            />
          </section>
        </main>
      </div>
    </>
  );
}
