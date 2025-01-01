import React from "react";

const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search Keywords..."
      className="w-64 pl-10 pr-4 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <svg
      className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
);

export default SearchBar;
