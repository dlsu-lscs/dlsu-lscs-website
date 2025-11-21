import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import ArticleContent from '../organism/article-content';
import SideBar from '../organism/sidebar';
import { fetchArticleBySlug } from '../../services';

export default async function Article({ slug }: { slug: string }) {
  const article = await fetchArticleBySlug(slug);

  return (
    <div className="w-full flex md:px-16 md:py-12 py-6 px-8 gap-14">
      <DiagonalLscsBg className="opacity-40" />
      <ArticleContent article={article} />
      <SideBar />
    </div>
  );
}
