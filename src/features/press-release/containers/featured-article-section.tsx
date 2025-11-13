import FeaturedArticle from '../components/featured-article';
import { getPressReleases } from '../lib/getPressReleases';

export default function FeaturedArticleSection() {
  const articles = getPressReleases();
  const featured = articles[0];
  if (!featured) return null;

  const cleanContent = featured.content?.replace(/<!--[\s\S]*?-->/g, '').trim() ?? '';

  const description =
    featured.subtitle && featured.subtitle !== '-' ? featured.subtitle : cleanContent;

  return (
    <section className="max-w-7xl mx-auto px-6 py-2">
      <FeaturedArticle
        title={featured.title}
        date={featured.date ? new Date(featured.date).toLocaleDateString() : ''}
        author={featured.author}
        description={description}
        image={featured.featuredImage ?? '/default.jpg'}
        link={`/press/${featured.slug}`}
      />
    </section>
  );
}
