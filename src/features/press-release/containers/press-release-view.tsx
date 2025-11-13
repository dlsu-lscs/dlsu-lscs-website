'use client';

import { useState, useEffect } from 'react';
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

// Mock data for frontend preview
const mockReleases: PressRelease[] = [
  {
    slug: 'press-001',
    title: 'DLSU LSCS Wins Hackathon 2025',
    subtitle: 'Student developers shine at national competition',
    content: 'Lorem ipsum dolor sit amet...',
    date: '2025-11-01',
    author: 'Jane Doe',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-002',
    title: 'New LSCS Lab Opens',
    subtitle: 'Cutting-edge research facilities inaugurated',
    content: 'Sed do eiusmod tempor incididunt...',
    date: '2024-09-15',
    author: 'John Smith',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-003',
    title: 'AI Workshop for Students',
    subtitle: 'Hands-on sessions in machine learning',
    content: 'Ut enim ad minim veniam...',
    date: '2023-05-20',
    author: 'Jane Doe',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-004',
    title: 'Faculty Research Published',
    subtitle: 'Innovative AI research recognized internationally',
    content: 'Duis aute irure dolor in reprehenderit...',
    date: '2023-04-10',
    author: 'Alice Tan',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-005',
    title: 'LSCS Student Wins Scholarship',
    subtitle: 'Scholarship awarded for excellence in software engineering',
    content: 'Excepteur sint occaecat cupidatat non proident...',
    date: '2024-01-22',
    author: 'John Smith',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-006',
    title: 'Cybersecurity Seminar Held',
    subtitle: 'Experts train students on ethical hacking',
    content: 'Sunt in culpa qui officia deserunt mollit anim id est laborum...',
    date: '2024-03-05',
    author: 'Jane Doe',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-007',
    title: 'LSCS Wins National Robotics Competition',
    subtitle: 'Team creates innovative robots for healthcare',
    content: 'Lorem ipsum dolor sit amet...',
    date: '2025-02-17',
    author: 'Alice Tan',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-008',
    title: 'New AI Lab Inaugurated',
    subtitle: 'Focus on machine learning and robotics',
    content: 'Sed do eiusmod tempor incididunt...',
    date: '2024-11-09',
    author: 'John Smith',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-009',
    title: 'Students Participate in Open Source Hackathon',
    subtitle: 'Collaboration with industry leaders',
    content: 'Ut enim ad minim veniam...',
    date: '2023-07-30',
    author: 'Jane Doe',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-010',
    title: 'LSCS Faculty Attends Conference',
    subtitle: 'Faculty presents research at international conference',
    content: 'Duis aute irure dolor in reprehenderit...',
    date: '2023-10-12',
    author: 'Alice Tan',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-011',
    title: 'Graduating Class of 2025 Honored',
    subtitle: 'Celebration of outstanding achievements',
    content: 'Excepteur sint occaecat cupidatat non proident...',
    date: '2025-06-15',
    author: 'John Smith',
    featuredImage: '/default.jpg',
  },
  {
    slug: 'press-012',
    title: 'Student-Led App Wins Award',
    subtitle: 'Innovative mobile app recognized nationally',
    content: 'Sunt in culpa qui officia deserunt mollit anim id est laborum...',
    date: '2024-08-20',
    author: 'Jane Doe',
    featuredImage: '/default.jpg',
  },
];

export default function PressReleaseView() {
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function loadReleases() {
      try {
        const res = await fetch('/api/press');
        if (!res.ok) throw new Error('API not ready');
        const data: PressRelease[] = await res.json();
        setReleases(data);
      } catch {
        setReleases(mockReleases);
      }
    }
    loadReleases();
  }, []);

  const filtered = releases.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen w-full bg-transparent overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Only the FilterBar is needed */}
        <FilterBar onSearch={setQuery} />

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">No press releases yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {paginated.map((item) => (
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

            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
