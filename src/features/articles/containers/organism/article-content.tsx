import ArticleHeader from '../molecules/article-header';

export default function ArticleContent() {
  return (
    <>
      <article className="flex-4/6 flex justify-center p-16">
        <ArticleHeader
          title="Hello, Future!: What Comes Next"
          uploadDate="April 19, 2025 "
          author="Franco Gonzalez"
        />
      </article>
    </>
  );
}
