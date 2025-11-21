import ArticleHeader from '../molecules/article-header';
import { LscsArticle } from '../../types';

export default function ArticleContent({ article }: { article: LscsArticle }) {
  return (
    <>
      <article className="flex-4/6 flex justify-center ">
        <ArticleHeader
          title={article.title}
          uploadDate={new Date(article.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          author={typeof article.author === 'object' ? article.author.name : ''}
        />
      </article>
    </>
  );
}
