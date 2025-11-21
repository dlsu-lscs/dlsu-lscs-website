import Article from '@/features/articles/containers/article-page';
import { fetchArticles } from '@/features/articles/services';
import { LscsArticle } from '@/features/articles/types';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return articles.map((article: LscsArticle) => ({
    slug: article.slug,
  }));
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <Article slug={slug} />
    </>
  );
}
