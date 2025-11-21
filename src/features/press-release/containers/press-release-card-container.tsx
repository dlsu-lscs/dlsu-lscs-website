'use client';

import { useState } from 'react';
import FilterBar from '../components/filter-bar';
import PressReleaseCard from '../components/press-release-card';
import Pagination from '../components/pagination';

type PressRelease = {
  slug: string;
  title: string;
  subtitle?: string;
  content?: string;
  date?: string;
  author?: string;
  featuredImage?: string;
};

type PressReleaseCardContainerProps = {
  releases: PressRelease[];
};

const ITEMS_PER_PAGE = 6;

export default function PressReleaseCardContainer({ releases }: PressReleaseCardContainerProps) {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = releases.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <FilterBar onSearch={setQuery} />

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

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
