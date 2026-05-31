import Image from 'next/image';
import Link from 'next/link';

interface cardProps {
  title: string;
  date: string;
  imgLink: string;
  slug: string;
}

export default function SideBarCard(props: cardProps) {
  return (
    <Link href={`/article/${props.slug}`}>
      <div className="flex gap-4 hover:opacity-75 transition-opacity">
        <div className="relative w-30 h-20 overflow-hidden rounded-l-md flex-shrink-0">
          <Image src={props.imgLink} alt={props.title} fill className="object-cover" sizes="80px" />
        </div>
        <p className="font-geist flex-1 flex flex-col justify-between min-w-0">
          <span className="font-bold bg-gradient-to-r from-[#DDB518] to-[#003D6F] to-75% bg-clip-text text-transparent line-clamp-3">
            {props.title}
          </span>
          <time className="text-xs text-black/50">{props.date}</time>
        </p>
      </div>
    </Link>
  );
}
