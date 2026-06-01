import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | La Salle Computer Society',
  description:
    'Meet the officers, batch representatives, and read testimonials from members of the La Salle Computer Society.',
  openGraph: {
    title: 'Community | La Salle Computer Society',
    description:
      'Meet the LSCS team, batch representatives, and read testimonials from members of the La Salle Computer Society.',
    url: '/community',
    images: [
      {
        url: '/cover/Web_Cover.jpg',
        width: 1200,
        height: 630,
        alt: 'La Salle Computer Society Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community | La Salle Computer Society',
    description:
      'Meet the LSCS team, batch representatives, and read testimonials from members of the La Salle Computer Society.',
    images: ['/cover/Web_Cover.jpg'],
  },
  alternates: {
    canonical: '/community',
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
