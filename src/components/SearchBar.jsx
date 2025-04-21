import { Search } from "lucide-react";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg"
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
}

export default SearchBar;
