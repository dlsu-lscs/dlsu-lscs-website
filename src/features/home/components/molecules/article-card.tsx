import Link from 'next/link';
import Image from 'next/image';
import { HomeArticle } from '../../types';
import { MdOutlineCalendarMonth } from 'react-icons/md';

export default function ArticleCard({ slug, title, content, date, featuredImage }: HomeArticle) {
  return (
    <Link href={`/article/${slug}`}>
      <div className="flex gap-4 cursor-pointer group bg-gradient-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] p-6 rounded-lg">
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-white">
          <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
          <p className="text-sm mt-1 flex items-center gap-2 font-extralight">
            <MdOutlineCalendarMonth />
            {date
              ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </p>
          <p className="text-sm mt-2 line-clamp-2">
            {content?.replace(/[#*`\-_\[\]()]/g, '').slice(0, 100)}
          </p>
        </div>
      </div>
    </Link>
  );
}
