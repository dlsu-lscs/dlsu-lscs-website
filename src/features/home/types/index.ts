export type HomeArticle = {
  slug: string;
  title: string;
  subtitle: string;
  date?: string;
  author: string;
  featuredImage: string;
  content?: string; // Article content (mdContent)
};
