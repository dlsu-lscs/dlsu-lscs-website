import { LscsArticle } from '../types';

export async function fetchArticle(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lscs-articles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `users API-Key ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  const json = await res.json();
  return json;
}

export async function fetchArticles(limit: number = 0): Promise<LscsArticle[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: '-createdAt', // Sort by newest first
    'where[_status][equals]': 'published', // Only get published articles
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lscs-articles?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `users API-Key ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  const json = await res.json();
  return json.docs || [];
}

export async function fetchArticleBySlug(slug: string): Promise<LscsArticle> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lscs-articles?where[slug][equals]=${slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${process.env.API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  const json = await res.json();
  const articles = json.docs || [];
  if (articles.length === 0) {
    throw new Error(`Article with slug "${slug}" not found`);
  }

  return articles[0];
}
