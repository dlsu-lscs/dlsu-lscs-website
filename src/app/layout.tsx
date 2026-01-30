import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Onest, Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/organism/navbar';

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
        url: '/icon.svg',
        width: 128,
        height: 128,
        alt: 'La Salle Computer Society Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'La Salle Computer Society',
    description: 'La Salle Computer Society Website',
    images: ['/icon.svg'],
  },
};

const onest = Onest({ variable: '--font-onest', subsets: ['latin'] });
const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(onest.variable, geist.variable, 'snap-y scroll-pt-20 snap-mandatory')}
    >
      <body className="w-full font-Poppins antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
