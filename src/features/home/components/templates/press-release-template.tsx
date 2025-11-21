import PressReleaseGrid from '../organism/press-release-grid';
import { fetchArticles } from '@/features/articles/services';
import { HomeArticle } from '../../types';
import DiagonalLscsBg from '@/components/diagonal-lscs-bg';
import matter from 'gray-matter';
import Link from 'next/link';

export default async function PressReleaseTemplate() {
  let articles: HomeArticle[] = [];

  try {
    const fetchedArticles = await fetchArticles(3); // Fetch 3 latest articles
    articles = fetchedArticles.map((article) => {
      let parsedContent = '';

      // Parse mdContent to extract content without frontmatter
      if (article.mdContent) {
        try {
          const { content } = matter(article.mdContent);
          parsedContent = content;
        } catch {
          // Fallback to raw mdContent if parsing fails
          parsedContent = article.mdContent;
        }
      }

      return {
        slug: article.slug,
        title: article.title,
        subtitle: article.subtitle ?? '',
        date: article.createdAt,
        author: typeof article.author === 'object' ? article.author.name : '',
        featuredImage:
          typeof article.featuredImage === 'object' && article.featuredImage?.url
            ? article.featuredImage.url
            : '/misc/placeholder.png',
        content: parsedContent,
      };
    });
  } catch (error) {
    console.error('Error loading articles:', error);
  }

  return (
    <main className="relative min-h-screen w-full border-t-black border-2 sm:p-12 p-6">
      <DiagonalLscsBg />
      <header className="flex justify-center text-center">
        <h1 className="font-bold text-4xl sm:text-5xl text-[#002D57] mb-8">PRESS RELEASES</h1>
      </header>
      <section className="max-w-7xl flex items-center justify-center">
        <PressReleaseGrid articles={articles} />
      </section>
      <div className="text-center mt-8">
        <Link href={'/press-release'} className="text-[#002D57] underline font-bold">
          Browse the Press Release {'>'}{' '}
        </Link>
      </div>
    </main>
  );
}
