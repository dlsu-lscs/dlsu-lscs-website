'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLenis } from 'lenis/react';

export default function NavbarButton({
  children,
  link,
  ...props
}: {
  children: React.ReactNode;
  link?: string;
} & Omit<React.ComponentProps<typeof Link>, 'href'>) {
  const router = useRouter();
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Run any external onClick handler (e.g. from SheetClose)
    if (props.onClick) {
      props.onClick(e);
    }

    if (!link) return;

    try {
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
      }
    } catch (err) {
      // fallback
    }
  };

  return (
    <Link
      href={link || '#'}
      onClick={handleClick}
      className="bg-[#007EBB] text-[#FFFF] font-onest font-medium rounded-lg px-10 py-2 hover:bg-[#005f87] transition-colors text-center"
      {...props}
    >
      {children}
    </Link>
  );
}
