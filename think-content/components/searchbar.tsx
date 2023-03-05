import React from "react";
import { BsGear, BsX, BsXCircle } from "react-icons/bs";
import { GeneralIcon } from "./sidebar";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleClear = () => {
    onChange("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center justify-between w-full h-8 max-w-md mx-4 my-2">
      <input
        type="text"
        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none focus:shadow-outline"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
      {value.length > 0 && (
        <button
          className="inset-y-0 flex items-center pl-1 pr-8 text-gray-400 right-2"
          onClick={handleClear}
        >
            <GeneralIcon icon={<BsXCircle size = "24"/>} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
