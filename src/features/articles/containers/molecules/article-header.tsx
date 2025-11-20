interface headerProps {
  title: string;
  uploadDate: string;
  author: string;
}

export default function ArticleHeader(props: headerProps) {
  return (
    <>
      <header className="border-b-2 border-black py-2 h-fit w-full">
        <h1 className="font-onest text-5xl font-bold inline-block bg-gradient-to-r from-[#DDB518] to-[#003D6F] to-75% bg-clip-text text-transparent">
          {props.title}
        </h1>
        <p className="py-2 font-geist text-black/50 text-base">
          <time>{props.uploadDate}</time>
          {' • '}
          <span>{props.author}</span>
        </p>
      </header>
    </>
  );
}
