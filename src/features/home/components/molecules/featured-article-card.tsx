import Link from 'next/link';
import Image from 'next/image';
import { HomeArticle } from '../../types';
import { MdOutlineCalendarMonth } from 'react-icons/md';

export default function FeaturedArticleCard({
  slug,
  title,
  content,
  date,
  featuredImage,
}: HomeArticle) {
  return (
    <Link href={`/article/${slug}`}>
      <div className="p-6 bg-gradient-to-b from-[rgba(221,181,24,0.9)] to-[rgba(119,97,13,0.9)] h-full cursor-pointer group rounded-[16px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Image Container */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Text Container with Gradient Background */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-200 mt-3 flex items-center gap-2">
            <MdOutlineCalendarMonth />
            {date
              ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </p>
          <p className="text-sm text-gray-100 mt-2 line-clamp-3">
            {content?.replace(/[#*`\-_\[\]()]/g, '').slice(0, 150)}...
          </p>
        </div>
      </div>
    </Link>
  );
}
