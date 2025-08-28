import Image from 'next/image';

type ImageItem = {
  src: string;
  alt: string;
};

type ImageGridProps = {
  images: ImageItem[];
};

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-18 gap-y-6 w-8.8/10 -mr-8 mt-4 ml-6 mb-4">
      {images.map((img, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-xl overflow-hidden w-[312px] h-[360px]
            ${index % 2 === 0 ? '-translate-y-4' : 'translate-y-4'} 
            shadow-[0_4px_16px_rgba(255,255,255,0.4)]`}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
