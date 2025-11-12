import Image from 'next/image';

type FeaturedArticleProps = {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
};

export default function FeaturedArticle({
  title,
  date,
  description,
  image,
  link,
}: FeaturedArticleProps) {
  return (
    <div className="bg-[#F9A826] rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
      <Image
        src={image}
        alt={title}
        width={480}
        height={320}
        className="object-cover w-full md:w-1/2"
      />
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
          <p className="text-sm text-white/80 mb-3">{date}</p>
          <p className="text-white/90 mb-4">{description}</p>
        </div>
        <a
          href={link}
          className="self-start bg-white text-[#F9A826] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
