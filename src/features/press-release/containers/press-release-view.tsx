import PressReleaseCardContainer from './press-release-card-container';
import { fetchArticles } from '@/features/articles/services';

type PressRelease = {
  slug: string;
  title: string;
  subtitle?: string;
  content?: string;
  date?: string;
  author?: string;
  featuredImage?: string;
};

export default async function PressReleaseView() {
  let releases: PressRelease[] = [];

  try {
    const articles = await fetchArticles(0);

    releases = articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      subtitle: article.subtitle ?? undefined,
      content: article.mdContent ?? undefined,
      date: article.createdAt,
      author: typeof article.author === 'object' ? article.author.name : '',
      featuredImage:
        typeof article.featuredImage === 'object' && article.featuredImage?.url
          ? article.featuredImage.url
          : undefined,
    }));
  } catch (error) {
    console.error('Error loading press releases:', error);
  }

  return (
    <main className="min-h-screen w-full bg-transparent overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-6 py-8">
        <PressReleaseCardContainer releases={releases} />
      </section>
    </main>
  );
}
