export interface LscsArticleCategory {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "lscs-articles".
 */
export interface LscsArticle {
  id: number;
  title: string;
  subtitle: string;
  featuredImage?: (number | null) | Media;
  content: {
    root: {
      type: string;
      children: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  mdContent?: string | null;
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  author: number | LscsArticleAuthor;
  category: number | LscsArticleCategory;
  tags?: string[] | null;
  slug: string;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "lscs-article-authors".
 */
export interface LscsArticleAuthor {
  id: number;
  name: string;
  bio?: string | null;
  avatar?: (number | null) | Media;
  user?: number | null;
  updatedAt: string;
  createdAt: string;
}

export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
