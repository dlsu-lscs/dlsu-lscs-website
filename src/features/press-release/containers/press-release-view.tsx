'use client';

import { useState, useEffect } from 'react';
import FilterBar from '../components/filter-bar';
import PressReleaseCard from '../components/press-release-card';
import Pagination from '../components/pagination';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type PressRelease = {
  slug: string;
  title: string;
  subtitle?: string;
  content?: string;
  date?: string;
  author?: string;
  featuredImage?: string;
};

export default function PressReleaseView() {
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [authorFilter, setAuthorFilter] = useState<string>('');

  // Placeholder effect for future API integration
  useEffect(() => {
    async function loadReleases() {
      try {
        // Replace with CMS API
        const res = await fetch('/api/press');
        if (!res.ok) throw new Error('API not ready');
        const data: PressRelease[] = await res.json();
        setReleases(data);
      } catch (err) {
        console.log('Press releases API not ready yet', err);
        setReleases([]);
      }
    }
    loadReleases();
  }, []);

  const filtered = releases.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesYear = yearFilter ? new Date(item.date || '').getFullYear() === yearFilter : true;
    const matchesAuthor = authorFilter
      ? item.author?.toLowerCase().includes(authorFilter.toLowerCase())
      : true;

    return matchesQuery && matchesYear && matchesAuthor;
  });

  const years = Array.from(
    new Set(releases.map((r) => new Date(r.date || '').getFullYear()))
  ).filter(Boolean);
  const authors = Array.from(new Set(releases.map((r) => r.author))).filter(Boolean);

  return (
    <main className="min-h-screen w-full bg-transparent overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <FilterBar onSearch={setQuery} placeholder="Search press releases..." />

          <div className="flex gap-2">
            <select
              value={yearFilter ?? ''}
              onChange={(e) => setYearFilter(e.target.value ? Number(e.target.value) : null)}
              className="border rounded px-2 py-1"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">All Authors</option>
              {authors.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">No press releases yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filtered.map((item) => (
                <PressReleaseCard
                  key={item.slug}
                  title={item.title}
                  description={item.subtitle || item.content?.slice(0, 120) + '...'}
                  date={item.date ? new Date(item.date).toLocaleDateString() : ''}
                  author={item.author}
                  image={item.featuredImage ?? '/default.jpg'}
                  link={`/press/${item.slug}`}
                />
              ))}
            </div>

            <div className="mt-12">
              <Carousel>
                <CarouselContent>
                  {filtered.map((item, index) => (
                    <CarouselItem
                      key={item.slug || index}
                      className="sm:basis-1/4 md:basis-1/2 lg:basis-1/4"
                    >
                      <PressReleaseCard
                        title={item.title}
                        description={item.subtitle || item.content?.slice(0, 120) + '...'}
                        date={item.date ? new Date(item.date).toLocaleDateString() : ''}
                        author={item.author}
                        image={item.featuredImage ?? '/default.jpg'}
                        link={`/press/${item.slug}`}
                        buttonText="Read More"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <Pagination />
          </>
        )}
      </section>
    </main>
  );
}
