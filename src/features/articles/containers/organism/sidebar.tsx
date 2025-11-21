import Image from 'next/image';
import SideBarCard from '../molecules/sidebar-card';

export default function SideBar() {
  return (
    <div className="md:flex-2/6 lg:block hidden">
      <aside className="justify-start max-w-96 flex flex-col gap-6">
        <section className="py-4 px-6 rounded-lg bg-white drop-shadow-xl flex flex-col gap-2">
          <h3 className="font-onest font-bold text-base">Share This Story</h3>
          <div className="flex gap-4">
            <Image alt="facebook icon" width={32} height={32} src={'/icons/fb-icon.png'} />
            <Image alt="instagram icon" width={32} height={32} src={'/icons/ig-icon.png'} />
            <Image alt="twitter icon" width={32} height={32} src={'/icons/twitter-icon.png'} />
            <Image alt="linkedln icon" width={32} height={32} src={'/icons/linkedln-icon.png'} />
          </div>
        </section>
        <section className="bg-white drop-shadow-xl rounded-lg p-4 flex flex-col gap-4">
          <h3 className="font-onest text-base font-bold ">Suggested Articles</h3>
          {/** TEMP **/}
          {[...Array(3)].map((_, i) => (
            <SideBarCard
              imgLink="/misc/placeholder.png"
              date="January 1, 1999"
              title="Lorem ipsum dolor sit amet, consecteturb"
              key={i}
            ></SideBarCard>
          ))}
        </section>
        <section className="bg-white drop-shadow-xl rounded-lg p-4 flex flex-col gap-4">
          <h3 className="font-onest text-base font-bold ">Latest Releases</h3>
          {/** TEMP **/}
          {[...Array(3)].map((_, i) => (
            <SideBarCard
              imgLink="/misc/placeholder.png"
              date="January 1, 1999"
              title="Lorem ipsum dolor sit amet, consecteturb"
              key={i}
            ></SideBarCard>
          ))}
        </section>
      </aside>
    </div>
  );
}
