import Image from 'next/image';

type PressReleaseCardProps = {
  title: string;
  description: string;
  date?: string;
  author?: string;
  image: string;
};

export default function PressReleaseCard({
  title,
  description,
  date,
  author,
  image,
}: PressReleaseCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition">
      <div className="p-4 pb-0">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="object-cover w-full rounded-md"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[#003D6F] text-2xl font-bold mb-1">{title}</h3>
        <p className="text-base text-gray-500 mb-2">
          {formattedDate}
          {author ? ` • ${author}` : ''}
        </p>
        <p className="text-gray-600 flex-1 mb-3 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
