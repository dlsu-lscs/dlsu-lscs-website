import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Onest, Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/organism/navbar';
import { createOrganizationSchema, createWebsiteSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'La Salle Computer Society',
  description: 'La Salle Computer Society Website',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'La Salle Computer Society',
    description: 'La Salle Computer Society Website',
    images: [
      {
        url: '/cover/Web_Cover.jpg',
        width: 128,
        height: 128,
        alt: 'La Salle Computer Society GA',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'La Salle Computer Society',
    description: 'La Salle Computer Society Website',
    images: ['/cover/Web_Cover.jpg'],
  },
};

const onest = Onest({ variable: '--font-onest', subsets: ['latin'] });
const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = createOrganizationSchema();
  const websiteData = createWebsiteSchema();

  return (
    <html
      lang="en"
      className={cn(onest.variable, geist.variable, 'snap-y scroll-pt-20 snap-mandatory')}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body className="w-full font-Poppins antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
