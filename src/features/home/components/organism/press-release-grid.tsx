import FeaturedArticleCard from '../molecules/featured-article-card';
import ArticleCard from '../molecules/article-card';
import { HomeArticle } from '../../types';

interface PressReleaseGridProps {
  articles: HomeArticle[];
}

export default function PressReleaseGrid({ articles }: PressReleaseGridProps) {
  const leftArticle = articles[0];
  const rightArticles = articles.slice(1, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max">
      {/* Left side - Large featured article */}
      {leftArticle && (
        <div className="lg:col-span-1 lg:row-span-2">
          <FeaturedArticleCard {...leftArticle} />
        </div>
      )}

      {/* Right side - Two stacked articles */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        {rightArticles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
