import PressReleaseCardContainer from './press-release-card-container';
import { fetchArticles } from '@/features/articles/services';
import { PressRelease } from '../types';

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
    <main className="w-full bg-transparent overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Subtle section header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-onest font-bold text-white tracking-tight">
            All Articles
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-[#ddb518] to-transparent rounded-full mt-2" />
        </div>

        <PressReleaseCardContainer releases={releases} />
      </section>
    </main>
  );
}
