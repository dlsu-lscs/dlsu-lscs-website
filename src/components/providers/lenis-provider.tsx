'use client';

import * as React from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

function LenisScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isFirstMount = React.useRef(true);

  React.useEffect(() => {
    if (lenis && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const scrollToTarget = (immediate: boolean) => {
          try {
            const el = document.querySelector(hash) as HTMLElement | null;
            if (el) {
              lenis.scrollTo(el, { immediate });
              return true;
            }
          } catch (e) {
            // querySelector might fail on invalid selectors
          }
          return false;
        };

        // Try immediately
        const success = scrollToTarget(isFirstMount.current);

        if (!success) {
          // If not found, try again shortly
          const timer = setTimeout(() => {
            scrollToTarget(false);
          }, 150);
          return () => clearTimeout(timer);
        }
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
      isFirstMount.current = false;
    }
  }, [pathname, lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const lenisOptions = React.useMemo(() => {
    if (pathname === '/' || pathname === '/about-us') {
      // Smoother scrolling for root and about routes
      return {
        lerp: 0.06,
        duration: 1.5,
        smoothWheel: true,
      };
    }

    if (pathname.startsWith('/article/')) {
      // Less smooth, more responsive scrolling for article slug pages
      return {
        lerp: 0.2,
        duration: 0.6,
        smoothWheel: true,
      };
    }

    // Default scrolling behavior for other pages
    return {
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    };
  }, [pathname]);

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisScrollReset />
      {children}
    </ReactLenis>
  );
}
