import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'La Salle Computer Society',
  description: 'La Salle Computer Society Website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full font-Poppins antialiased">{children}</body>
    </html>
  );
}
