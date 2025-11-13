import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type FilterBarProps = {
  onSearch: (query: string) => void;
};

export default function FilterBar({ onSearch }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-between items-end gap-6 w-full">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label className="text-white font-medium mb-1">Publish Year:</label>
          <select className="bg-[#D0D0D0] text-gray-800 px-3 py-2 rounded-md w-40">
            <option>All Time</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-1">Author:</label>
          <select className="bg-[#D0D0D0] text-gray-800 px-3 py-2 rounded-md w-40">
            <option>All Authors</option>
            <option>Admin</option>
            <option>LSCS PR Team</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-white font-medium mb-1">Sort By:</label>
          <select className="bg-[#D0D0D0] text-gray-800 px-3 py-2 rounded-md w-40">
            <option>Latest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search by title..."
          className="bg-[#D0D0D0] text-gray-800 pr-10 pl-3 py-2 rounded-md w-64"
          onChange={(e) => onSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
}
