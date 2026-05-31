'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLenis } from 'lenis/react';

export default function NavbarButton({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: string;
}) {
  const router = useRouter();
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!link) return;

    const url = new URL(link, window.location.origin);
    const hash = url.hash;
    const pathname = url.pathname;

    // Check if it's a hash link on the same page
    if (hash && pathname === window.location.pathname) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(hash);
      } else {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (hash) {
      // Navigate to the page and then scroll to the hash
      e.preventDefault();
      router.push(link);
      // Wait for navigation and then scroll
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(hash);
        } else {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  };

  return (
    <Link
      href={link || '#'}
      onClick={handleClick}
      className="bg-[#007EBB] text-[#FFFF] font-onest font-medium rounded-lg px-10 py-2 hover:bg-[#005f87] transition-colors"
    >
      {children}
    </Link>
  );
}
