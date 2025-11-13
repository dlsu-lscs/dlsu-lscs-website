import Image from 'next/image';

type PressReleaseCardProps = {
  title: string;
  description: string;
  date: string;
  author?: string;
  image: string;
  link: string;
};

export default function PressReleaseCard({
  title,
  description,
  date,
  author,
  image,
}: PressReleaseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition">
      <Image src={image} alt={title} width={400} height={250} className="object-cover w-full" />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {date} • {author}
        </p>
        <p className="text-gray-600 flex-1 mb-3 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
