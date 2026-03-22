import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | La Salle Computer Society',
  description:
    'Discover the La Salle Computer Society — our mission, vision, core values, achievements, team, and partners shaping the technology and innovation community at De La Salle University.',
  openGraph: {
    title: 'About Us | La Salle Computer Society',
    description:
      'Meet the LSCS team, explore our vision, core values, achievements, and partners fostering student innovation at DLSU.',
    url: '/about-us',
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
    title: 'About Us | La Salle Computer Society',
    description:
      'Explore the mission, vision, team, achievements, and partners of the La Salle Computer Society.',
    images: ['/icon.svg'],
  },
  alternates: {
    canonical: '/about-us',
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full">{children}</div>;
}
