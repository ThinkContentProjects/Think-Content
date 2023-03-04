import React, { useState } from "react"

export default function searchBar() {
    const [isSearching, setIsSearching] = useState(false);
  
  
    const handleSearch = () => {
      setIsSearching(!isSearching);
    };
    return (
        <div className="relative items-center justify-center w-full max-w-sm mx-4">
            <span className="absolute inset-y-auto left-0 items-center justify-center flex-auto pt-2 pl-3 ">
                <svg
                className={`h-6 w-6 ${
                    isSearching ? "text-gray-500" : "text-gray-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={handleSearch}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isSearching ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
                </svg>
            </span>
            <input
                className={`bg-gray-100 block w-full pl-10 pr-3 py-2 rounded-md ${
                isSearching ? "border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" : ""
                }`}
                type="text"
                placeholder="Search"
                onClick={handleSearch}
            />
        </div>
    )
}
