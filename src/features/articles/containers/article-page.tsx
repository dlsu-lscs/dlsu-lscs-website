import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import ArticleContent from './organism/article-content';

export default function Article() {
  return (
    <div className="w-full h-screen flex ">
      <DiagonalLscsBg className={'opacity-40'} />
      <ArticleContent />
      <div className="flex-2/6 bg-red-500"></div>
    </div>
  );
}
