import { FaShareAlt } from 'react-icons/fa';

export default function ContactUsPage() {
  return (
    <>
      <div className="flex justify-center items-center p-8 h-96 gap-8 relative border-y-2 border-black">
        <main className="flex w-full flex-wrap justify-center lg:gap-24 sm:gap-16 gap-8">
          <section className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">Get in touch</h1>
            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            {/* change to shadcn button later */}
            <button className="self-start bg-gray-300 px-10 py-2 font-medium text-xl">
              Lorem ipsum dolor
            </button>
          </section>
          <section className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">Stay in touch</h1>
            <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            <div className="flex gap-4">
              {/* TEMP */}
              <span className="w-12 h-12 bg-gray-300 flex justify-center items-center">
                <FaShareAlt className="text-xl" />
              </span>
              <span className="w-12 h-12 bg-gray-300 flex justify-center items-center">
                <FaShareAlt className="text-xl" />
              </span>
              <span className="w-12 h-12 bg-gray-300 flex justify-center items-center">
                <FaShareAlt className="text-xl" />
              </span>
              <span className="w-12 h-12 bg-gray-300 flex justify-center items-center">
                <FaShareAlt className="text-xl" />
              </span>
              <span className="w-12 h-12 bg-gray-300 flex justify-center items-center">
                <FaShareAlt className="text-xl" />
              </span>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
