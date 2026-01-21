'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MoreHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ResponsivePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ResponsivePagination({
  currentPage,
  totalPages,
  onPageChange,
}: ResponsivePaginationProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detect screen size for responsive pagination
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    const handleResize = () => checkScreenSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate page numbers with ellipsis for responsive pagination
  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = isLargeScreen ? 7 : 3; // Show 7 pages on large screens, 3 on mobile
    const sidePages = isLargeScreen ? 3 : 1; // Show 3 pages on each side on large screens, 1 on mobile

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small enough
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include page 1
    pages.push(1);

    // Add left ellipsis if needed
    if (currentPage > sidePages + 2) {
      pages.push('...');
    }

    // Add pages around current page
    const start = Math.max(2, currentPage - sidePages);
    const end = Math.min(totalPages - 1, currentPage + sidePages);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (currentPage < totalPages - sidePages - 1) {
      pages.push('...');
    }

    // Always include last page
    pages.push(totalPages);

    // Remove duplicates
    return [...new Set(pages)];
  }, [currentPage, totalPages, isLargeScreen]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              {page === '...' ? (
                <span className="flex h-10 w-10 items-center justify-center">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </span>
              ) : (
                <PaginationLink
                  className={cn(page === currentPage && 'text-black', 'font-semibold')}
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
