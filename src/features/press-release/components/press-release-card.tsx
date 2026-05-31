import Image from 'next/image';
import Link from 'next/link';

type PressReleaseCardProps = {
  title: string;
  description: string;
  date?: string;
  author?: string;
  image: string;
  slug: string;
};

export default function PressReleaseCard({
  title,
  description,
  date,
  author,
  image,
  slug,
}: PressReleaseCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Link href={`/article/${slug}`} className="group block h-full">
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden flex flex-col h-full hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#002d57]/10 transition-all duration-300 cursor-pointer">
        {/* Image Container with aspect ratio */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content area */}
        <div className="p-6 flex-1 flex flex-col gap-3">
          <h3 className="text-[#003D6F] text-xl font-onest font-bold tracking-tight line-clamp-2 group-hover:text-[#ddb518] transition-colors duration-200">
            {title}
          </h3>

          <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">
            {formattedDate}
            {author ? ` • ${author}` : ''}
          </p>

          <p className="text-slate-600 text-sm leading-relaxed font-Poppins line-clamp-3 mb-2">
            {description}
          </p>

          {/* Action indicator at bottom */}
          <div className="mt-auto pt-3 flex items-center text-[#77610d] text-sm font-semibold tracking-wide group-hover:text-[#ddb518] transition-colors duration-200">
            Read Article
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
