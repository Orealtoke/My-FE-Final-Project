import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for recipes (e.g., Arrabiata, Pizza, Pasta)..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;