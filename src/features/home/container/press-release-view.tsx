import PressReleaseCard from '../components/press-release-card';

export default function PressReleaseView() {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-white">
        <div className="flex justify-center text-center mt-20">
          <h1 className="font-bold text-5xl">PRESS RELEASES</h1>
        </div>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-20">
          <PressReleaseCard />
        </main>
      </div>
    </>
  );
}
