import React from "react";

export default function SearchBar({ query, onQueryChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search recipes by name (e.g., Arrabiata)"
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-emerald-300"
      />
      <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
        Search
      </button>
    </form>
  );
}
