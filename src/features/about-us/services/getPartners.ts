import { CmsPartner } from '../types/partners';

export async function getPartners(): Promise<CmsPartner[]> {
  try {
    const params = new URLSearchParams({
      limit: '0',
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lscs-partners?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `users API-Key ${process.env.API_KEY}`,
        },
        next: { revalidate: 3600 }, // ISR: revalidate every hour
      }
    );

    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }

    const json = await res.json();
    return json.docs || [];
  } catch (error) {
    console.error('Error fetching partners from CMS:', error);
    return [];
  }
}
