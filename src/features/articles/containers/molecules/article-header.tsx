import Image from 'next/image';

interface headerProps {
  title: string;
  uploadDate: string;
  author: string;
  featuredImage?: string;
}

export default function ArticleHeader(props: headerProps) {
  return (
    <>
      <header className="w-full mb-8">
        <div className="h-fit w-full mb-6">
          <h1 className="font-onest sm:text-5xl text-3xl font-bold inline-block bg-gradient-to-r from-[#DDB518] to-[#003D6F] to-75% bg-clip-text text-transparent">
            {props.title}
          </h1>
          <p className="font-geist text-black/50 sm:text-base text-sm">
            <time>{props.uploadDate}</time>
            {' • '}
            <span>{props.author}</span>
          </p>
        </div>
        {props.featuredImage && (
          <>
            <div className="border-b-2 border-black mb-6" />
            <div className="flex justify-center">
              <div className="relative max-w-2xl">
                <Image
                  src={props.featuredImage}
                  alt={props.title}
                  width={1200}
                  height={675}
                  className="h-auto max-h-96 rounded-lg object-contain"
                  priority
                />
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
