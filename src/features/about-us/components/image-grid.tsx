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
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 w-full max-w-[650px] mx-auto px-2 sm:px-4">
      {images.map((img, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-xl overflow-hidden 
            aspect-[26/30]   
            ${index % 2 === 0 ? '-translate-y-2 sm:-translate-y-4' : 'translate-y-2 sm:translate-y-4'} 
            shadow-[0_4px_16px_rgba(255,255,255,0.4)]`}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
