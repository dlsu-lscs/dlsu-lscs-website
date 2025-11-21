import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import ArticleContent from './organism/article-content';
import SideBar from './organism/sidebar';
import { fetchArticleBySlug } from '../services';

export default async function Article({ slug }: { slug: string }) {
  const article = await fetchArticleBySlug(slug);

  return (
    <div className="w-full flex p-16 gap-14">
      <DiagonalLscsBg className={'opacity-40'} />
      <ArticleContent article={article} />
      <SideBar />
    </div>
  );
}
