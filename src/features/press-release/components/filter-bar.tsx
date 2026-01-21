import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type FilterBarProps = {
  onSearch: (query: string) => void;
  onYearChange: (year: string) => void;
  onAuthorChange: (author: string) => void;
  onSortChange: (sort: string) => void;
  selectedYear: string;
  selectedAuthor: string;
  selectedSort: string;
  authors?: string[];
  years?: string[];
};

export default function FilterBar({
  onSearch,
  onYearChange,
  onAuthorChange,
  onSortChange,
  selectedYear,
  selectedAuthor,
  selectedSort,
  authors = [],
  years = [],
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-between items-end gap-6 w-full">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label className="text-white font-medium mb-1">Publish Year:</label>
          <select
            className="bg-[#D0D0D0] text-gray-800 px-3 py-2 rounded-md w-40"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
          >
            <option value="">All Time</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-1">Author:</label>
          <select
            className="bg-[#D0D0D0] text-gray-800 px-3 py-2 rounded-md w-40"
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-1">Sort By:</label>
          <select
            className="bg-[#D0D0D0] text-gray-800 px-3 py-2 rounded-md w-40"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search by title..."
          className="bg-slate-200 text-gray-800 pr-10 pl-3 py-2 rounded-md w-64 sm:w-96"
          onChange={(e) => onSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
}
