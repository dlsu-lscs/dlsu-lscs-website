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
          <label
            htmlFor="publish-year-select"
            className="text-sm font-medium tracking-wide text-white/80 mb-1.5 font-Poppins"
          >
            Publish Year:
          </label>
          <select
            id="publish-year-select"
            className="bg-white/10 text-white border border-white/20 hover:bg-white/15 focus:bg-[#002D57]/90 px-3 py-2 rounded-lg w-40 text-sm focus:outline-none focus:ring-2 focus:ring-[#ddb518]/50 focus:border-[#ddb518]/50 transition-all duration-200 cursor-pointer"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
          >
            <option value="" className="bg-[#002D57] text-white">
              All Time
            </option>
            {years.map((year) => (
              <option key={year} value={year} className="bg-[#002D57] text-white">
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="author-select"
            className="text-sm font-medium tracking-wide text-white/80 mb-1.5 font-Poppins"
          >
            Author:
          </label>
          <select
            id="author-select"
            className="bg-white/10 text-white border border-white/20 hover:bg-white/15 focus:bg-[#002D57]/90 px-3 py-2 rounded-lg w-40 text-sm focus:outline-none focus:ring-2 focus:ring-[#ddb518]/50 focus:border-[#ddb518]/50 transition-all duration-200 cursor-pointer"
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
          >
            <option value="" className="bg-[#002D57] text-white">
              All Authors
            </option>
            {authors.map((author) => (
              <option key={author} value={author} className="bg-[#002D57] text-white">
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="sort-select"
            className="text-sm font-medium tracking-wide text-white/80 mb-1.5 font-Poppins"
          >
            Sort By:
          </label>
          <select
            id="sort-select"
            className="bg-white/10 text-white border border-white/20 hover:bg-white/15 focus:bg-[#002D57]/90 px-3 py-2 rounded-lg w-40 text-sm focus:outline-none focus:ring-2 focus:ring-[#ddb518]/50 focus:border-[#ddb518]/50 transition-all duration-200 cursor-pointer"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="latest" className="bg-[#002D57] text-white">
              Latest
            </option>
            <option value="oldest" className="bg-[#002D57] text-white">
              Oldest
            </option>
          </select>
        </div>
      </div>

      <div className="relative w-full sm:w-96">
        <input
          type="text"
          aria-label="Search by title"
          placeholder="Search by title..."
          className="bg-white/10 text-white placeholder:text-white/50 border border-white/20 hover:bg-white/15 pr-10 pl-3.5 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ddb518]/50 focus:border-[#ddb518]/50 transition-all duration-200"
          onChange={(e) => onSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>
    </div>
  );
}
