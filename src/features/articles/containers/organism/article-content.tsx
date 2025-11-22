import ArticleHeader from '../molecules/article-header';
import { LscsArticle } from '../../types';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function ArticleContent({ article }: { article: LscsArticle }) {
  let content = '';
  let featuredImageUrl = '';

  try {
    const { content: parsedContent, data } = matter(article.mdContent ?? '');
    content = parsedContent;
    featuredImageUrl = data.featuredImage || '';
  } catch {
    // If YAML parsing fails, just use the mdContent as-is
    console.warn('Failed to parse YAML for article:', article.slug);
    content = article.mdContent ?? '';
    // Try to get featured image from article data instead
    featuredImageUrl =
      typeof article.featuredImage === 'object' && article.featuredImage?.url
        ? article.featuredImage.url
        : '';
  }

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
          featuredImage={featuredImageUrl}
        />
        <article className="w-full prose prose-a:text-blue-600 prose-a:hover:text-blue-500 font-geist">
          <ReactMarkdown>{content}</ReactMarkdown>{' '}
        </article>
      </main>
    </>
  );
}
