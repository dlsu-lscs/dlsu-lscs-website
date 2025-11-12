type FilterBarProps = {
  onSearch: (query: string) => void;
};

export default function FilterBar({ onSearch }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex gap-3 flex-wrap">
        <select className="bg-white text-gray-800 px-3 py-2 rounded-md">
          <option>All Years</option>
          <option>2025</option>
          <option>2024</option>
        </select>
        <select className="bg-white text-gray-800 px-3 py-2 rounded-md">
          <option>All Authors</option>
          <option>Admin</option>
          <option>LSCS PR Team</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="bg-white text-gray-800 px-4 py-2 rounded-md w-64"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
