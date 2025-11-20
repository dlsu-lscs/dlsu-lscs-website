import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Onest, Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'La Salle Computer Society',
  description: 'La Salle Computer Society Website',
};

const onest = Onest({ variable: '--font-onest' });
const geist = Geist({ variable: '--font-geist' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(onest.variable, geist.variable)}>
      <body className="min-h-screen w-full font-Poppins antialiased">{children}</body>
    </html>
  );
}
