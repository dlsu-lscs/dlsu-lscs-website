import Image from 'next/image';

type FeaturedArticleProps = {
  title: string;
  date?: string;
  author?: string;
  description: string;
  image: string;
  link: string;
};

export default function FeaturedArticle({
  title,
  date,
  author,
  description,
  image,
  link,
}: FeaturedArticleProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="bg-gradient-to-b from-[#DDB518] to-[#BC7A00] rounded-xl overflow-hidden shadow-lg flex flex-col min-h-[24rem] md:flex-row p-6">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto p-4 md:p-6">
        <Image src={image} alt={title} fill className="object-cover rounded-lg" />
      </div>

      <div className="p-6 md:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl md:text-5xl lg:6xl font-bold text-white mb-2">{title}</h2>

          <p className="text-base sm:text-lg text-white/80 mb-4">
            {formattedDate}
            {author ? ` • ${author}` : ''}
          </p>

          <p className="text-white/90 text-base sm:text-lg mb-4 line-clamp-4">{description}</p>
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
