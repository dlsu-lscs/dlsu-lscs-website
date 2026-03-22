import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Releases | La Salle Computer Society',
  description:
    'Stay updated with the latest press releases, news, and blogs from the La Salle Computer Society. Explore featured articles and official announcements.',
  openGraph: {
    title: 'Press Releases | La Salle Computer Society',
    description:
      'Read the latest press releases, news, and articles from LSCS, featuring official updates and announcements.',
    url: '/press-release',
    images: [
      {
        url: '/icon.svg',
        width: 128,
        height: 128,
        alt: 'La Salle Computer Society Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Releases | La Salle Computer Society',
    description: 'Catch the latest press releases, news, and articles from LSCS.',
    images: ['/icon.svg'],
  },
  alternates: {
    canonical: '/press-release',
  },
  keywords: [
    'La Salle Computer Society',
    'LSCS press releases',
    'student publications',
    'DLSU news',
    'LSCS blogs',
  ],
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full">{children}</div>;
}
