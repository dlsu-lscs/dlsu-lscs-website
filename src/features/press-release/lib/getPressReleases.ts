import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PressRelease = {
  slug: string;
  title: string;
  subtitle?: string;
  featuredImage?: string;
  author: string;
  date: string;
  edit?: string;
  content: string;
};

export function getPressReleases(): PressRelease[] {
  const blogDir = path.join(process.cwd(), 'blog');
  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace('.md', '');
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || 'Untitled',
        subtitle: data.subtitle || '',
        featuredImage: data.featuredImage || '/default.jpg',
        author: data.author || 'Unknown',
        date: data.date || '',
        edit: data.edit || '',
        content,
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
