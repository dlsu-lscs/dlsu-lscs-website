import HorizontalLscsBg from '../components/horizontal-lscs-bg';

export default function About() {
  return (
    <>
      <div className="min-h-screen relative flex items-center justify-between p-8 sm:p-16">
        {/* Background image with fade mask */}
        <HorizontalLscsBg />
        {/* Content */}
        <main className="flex flex-wrap gap-8">
          <section
            className="flex flex-col flex-1 gap-8 justify-center
          "
          >
            <h1 className=" self-start flex bg-gradient-to-r from-[#DDB518] to-[#AA8B12] text-white font-bold px-4 py-1.5 rounded-lg text-[18px] tracking-wider drop-shadow-2xl ">
              ABOUT US
            </h1>

            <div className="text-[#003D6F] sm:text-7xl text-5xl font-extrabold leading-none text-shadow-2xl drop-shadow-2xl">
              <h1>LA SALLE</h1>
              <h1>COMPUTER</h1>
              <h1>SOCIETY</h1>
            </div>

            <div>
              <p className="text-lg mr-8">
                is the pioneering organization in the College of Computer Studies now on its 38th
                year of service for the Lasallian community. Developing members to become competent
                and well-rounded Lasallians who are aware of the numerous advances in computer
                technology.
              </p>
            </div>
          </section>
          <section className="flex-1">
            <div
              className="grid gap-4 auto-rows-[200px]"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              }}
            >
              {/* Large image - spans 2 columns on larger screens, full width on mobile */}
              <div
                className="gallery-large bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=800&fit=crop)',
                }}
                aria-label="Programming workspace"
              />

              {/* Medium image */}
              <div
                className="gallery-medium bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop)',
                }}
                aria-label="Code on laptop"
              />

              {/* Small image */}
              <div
                className="gallery-small bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=200&fit=crop)',
                }}
                aria-label="Team collaboration"
              />

              {/* Tall image - spans 2 rows on larger screens, 1 row on mobile */}
              <div
                className="gallery-tall bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop)',
                }}
                aria-label="Students learning"
              />

              {/* Medium image */}
              <div
                className="gallery-medium bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop)',
                }}
                aria-label="Computer setup"
              />

              {/* Small image */}
              <div
                className="gallery-small bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop)',
                }}
                aria-label="Developer coding"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
