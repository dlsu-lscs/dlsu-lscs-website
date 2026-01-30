import { CmsAward } from '../types/awards';

export async function getAwards(): Promise<CmsAward[]> {
  try {
    const params = new URLSearchParams({
      limit: '0',
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lscs-awards?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${process.env.API_KEY}`,
      },
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }

    const json = await res.json();
    return json.docs || [];
  } catch (error) {
    console.error('Error fetching awards from CMS:', error);
    return [];
  }
}
