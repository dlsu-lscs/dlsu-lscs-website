import ArticleHeader from '../molecules/article-header';
import { LscsArticle } from '../../types';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function ArticleContent({ article }: { article: LscsArticle }) {
  const { content, data } = matter(article.mdContent ?? '');

  return (
    <>
      <main className="flex-4/6 flex justify-center flex-col items-center">
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
        <article className="w-full prose prose-a:text-blue-600 prose-a:hover:text-blue-500 font-geist">
          <ReactMarkdown>{content}</ReactMarkdown>{' '}
        </article>
      </main>
    </>
  );
}
