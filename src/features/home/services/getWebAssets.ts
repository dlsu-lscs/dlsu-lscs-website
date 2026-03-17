export interface CmsImage {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailURL: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
}

export interface CmsWebAssets {
  id: number;
  title: string;
  hero: {
    image: CmsImage;
  };
  whoAreWe: {
    image: CmsImage;
  };
  whatWeDo: {
    image1: CmsImage;
    image2: CmsImage;
    image3: CmsImage;
    image4: CmsImage;
  };
  about: {
    images: {
      id: string;
      image: CmsImage;
    }[];
  };
  updatedAt: string;
  createdAt: string;
}

export async function getWebAssets(): Promise<CmsWebAssets | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lscs-web-assets/1`, {
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
    return json;
  } catch (error) {
    console.error('Error fetching web assets from CMS:', error);
    return null;
  }
}
