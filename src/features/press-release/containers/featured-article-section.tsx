import FeaturedArticle from '../components/featured-article';
import { getPressReleases } from '../lib/getPressReleases';

export default function FeaturedArticleSection() {
  const articles = getPressReleases();
  const featured = articles[0];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <FeaturedArticle
        title={featured.title}
        date={new Date(featured.date).toLocaleDateString()}
        description={featured.subtitle || featured.content.slice(0, 150) + '...'}
        image={featured.featuredImage ?? '/default.jpg'}
        link={`/press/${featured.slug}`}
      />
    </section>
  );
}
