'use client';

import { useState, useMemo } from 'react';
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

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-gray-400">No press releases found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginated.map((item) => (
              <PressReleaseCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                description={item.subtitle || item.content?.slice(0, 120) + '...'}
                date={item.date}
                author={item.author}
                image={item.featuredImage ?? '/misc/placeholder.png'}
              />
            ))}
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
