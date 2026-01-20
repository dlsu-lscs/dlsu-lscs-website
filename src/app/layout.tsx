import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Onest, Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/organism/navbar';

export const metadata: Metadata = {
  title: 'La Salle Computer Society',
  description: 'La Salle Computer Society Website',
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
