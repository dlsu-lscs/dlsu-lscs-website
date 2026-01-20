'use client';

import { useEffect, useState, RefObject } from 'react';

export function useScrollDirection(scrollContainerRef?: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef?.current;
      const currentScrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;

      // Show navbar if scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Hide navbar if scrolling down and past threshold
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    const target = scrollContainerRef?.current || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollContainerRef]);

  return { isVisible };
}
