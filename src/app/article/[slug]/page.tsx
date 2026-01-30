import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Article from '@/features/articles/containers/templates/article-page';
import { fetchArticles, fetchArticleBySlug } from '@/features/articles/services';
import { LscsArticle } from '@/features/articles/types';

export const revalidate = 60; // Revalidate every hour

function getImageUrl(article: LscsArticle): string | undefined {
  if (article.meta?.image && typeof article.meta.image === 'object' && article.meta.image.url) {
    return article.meta.image.url;
  }
  if (typeof article.featuredImage === 'object' && article.featuredImage?.url) {
    return article.featuredImage.url;
  }
  return undefined;
}

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return articles.map((article: LscsArticle) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await fetchArticleBySlug(slug);

    const featuredImageUrl = getImageUrl(article);
    const title = article.meta?.title || article.title;
    const description =
      article.meta?.description || article.subtitle || `Read ${article.title} on LSCS`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const articleUrl = `${baseUrl}/article/${slug}`;

    return {
      title,
      description,
      keywords: article.tags?.join(', ') || 'LSCS, La Salle Computer Society, articles',
      authors: typeof article.author === 'object' ? [{ name: article.author.name }] : undefined,
      openGraph: {
        title,
        description,
        type: 'article',
        url: articleUrl,
        publishedTime: article.createdAt,
        modifiedTime: article.updatedAt,
        authors: typeof article.author === 'object' ? [article.author.name] : undefined,
        images: featuredImageUrl
          ? [{ url: featuredImageUrl, alt: title, width: 1200, height: 630 }]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: featuredImageUrl ? [featuredImageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    await fetchArticleBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Article slug={slug} />
    </>
  );
}
