'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../components/filter-bar';
import PressReleaseCard from '../components/press-release-card';
import ResponsivePagination from '../components/responsive-pagination';
import { applyFiltersAndSort } from '../utils';
import { PressRelease } from '../types';
import useDebouncer from '@/hooks/useDebouncer';

type PressReleaseCardContainerProps = {
  releases: PressRelease[];
};

const ITEMS_PER_PAGE = 6;

export default function PressReleaseCardContainer({ releases }: PressReleaseCardContainerProps) {
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedVal = useDebouncer({ delay: 400, value: query });

  const filtered = useMemo(
    () => applyFiltersAndSort(releases, debouncedVal, selectedYear, selectedAuthor, selectedSort),
    [releases, debouncedVal, selectedYear, selectedAuthor, selectedSort]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (callback: (value: string) => void) => {
    return (value: string) => {
      callback(value);
      setCurrentPage(1);
    };
  };

  // Extract unique authors and years from releases
  const uniqueAuthors = useMemo(() => {
    const authors = new Set(
      releases.map((r) => r.author).filter((author): author is string => Boolean(author))
    );
    return Array.from(authors).sort();
  }, [releases]);

  const uniqueYears = useMemo(() => {
    const years = new Set(
      releases
        .map((r) => {
          const year = r.date ? new Date(r.date).getFullYear().toString() : null;
          return year;
        })
        .filter((year): year is string => Boolean(year))
    );
    return Array.from(years).sort().reverse();
  }, [releases]);

  return (
    <>
      <FilterBar
        onSearch={handleFilterChange(setQuery)}
        onYearChange={handleFilterChange(setSelectedYear)}
        onAuthorChange={handleFilterChange(setSelectedAuthor)}
        onSortChange={handleFilterChange(setSelectedSort)}
        selectedYear={selectedYear}
        selectedAuthor={selectedAuthor}
        selectedSort={selectedSort}
        authors={uniqueAuthors}
        years={uniqueYears}
      />

      {/* Results Count Indicator */}
      <div className="mt-4 text-sm text-white/60 font-Poppins">
        {filtered.length === 0 ? (
          <span>No articles found</span>
        ) : (
          <span>
            Showing {Math.min(filtered.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}-
            {Math.min(filtered.length, currentPage * ITEMS_PER_PAGE)} of {filtered.length}{' '}
            {filtered.length === 1 ? 'article' : 'articles'}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center text-white/50 font-Poppins"
        >
          No press releases found. Try adjusting your filters or search query.
        </motion.p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <AnimatePresence mode="popLayout">
              {paginated.map((item, index) => (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="h-full"
                >
                  <PressReleaseCard
                    slug={item.slug}
                    title={item.title}
                    description={
                      item.subtitle || (item.content ? item.content.slice(0, 120) + '...' : '')
                    }
                    date={item.date}
                    author={item.author}
                    image={item.featuredImage ?? '/misc/placeholder.png'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <ResponsivePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
