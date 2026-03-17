import FeaturedArticle from '../components/featured-article';
import { fetchArticles } from '@/features/articles/services';
import { LscsArticleAuthor, Media } from '@/features/articles/types';
import matter from 'gray-matter';

export default async function FeaturedArticleSection() {
  try {
    const articles = await fetchArticles(1); // Fetch latest 1 article
    const featured = articles[0];

    if (!featured) return null;

    let description = featured.subtitle ?? '';

    if (!description || description === '-') {
      try {
        const { content } = matter(featured.mdContent ?? '');
        description = content.trim().slice(0, 150) + '...';
      } catch {
        description = '';
      }
    }

    return (
      <section className="max-w-7xl mx-auto px-6 py-2">
        <FeaturedArticle
          title={featured.title}
          date={featured.createdAt ? new Date(featured.createdAt).toLocaleDateString() : ''}
          author={(featured.author as LscsArticleAuthor)?.name}
          description={description}
          image={(featured.featuredImage as Media)?.url ?? '/default.jpg'}
          link={`/article/${featured.slug}`}
        />
      </section>
    );
  } catch (error) {
    console.error('Error loading featured article:', error);
    return null;
  }
}
