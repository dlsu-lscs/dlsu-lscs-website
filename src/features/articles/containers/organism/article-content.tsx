import ArticleHeader from '../molecules/article-header';
import { LscsArticle } from '../../types';
import matter from 'gray-matter';

export default function ArticleContent({ article }: { article: LscsArticle }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, data } = matter(article.mdContent ?? '');

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
          featuredImage={data.featuredImage}
        />
      </article>
    </>
  );
}
