import Image from 'next/image';

interface cardProps {
  title: string;
  date: string;
  imgLink: string;
}

export default function SideBarCard(props: cardProps) {
  return (
    <>
      <div className="flex gap-4">
        <div className="relative aspect-video w-[120px] overflow-hidden">
          <Image src="/misc/placeholder.png" alt="article image" fill className="object-contain" />
        </div>
        <p className="font-geist">
          <span className="font-bold inline-block bg-gradient-to-r from-[#DDB518] to-[#003D6F] to-75% bg-clip-text text-transparent">
            {props.title}
          </span>
          <time className="text-xs text-black/50">{props.date}</time>
        </p>
      </div>
    </>
  );
}
