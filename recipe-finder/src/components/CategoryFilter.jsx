import React, { useState, useEffect } from 'react';

const categories = [
  'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 
  'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'
];

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Filter by Category
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory('')}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeCategory === '' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Categories
        </button>
        
        {displayedCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === category 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
        
        {categories.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            {showAll ? 'Show Less' : 'Show More...'}
          </button>
        )}
      </div>
      
      {activeCategory && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing recipes in: <strong>{activeCategory}</strong>
          <button
            onClick={() => setActiveCategory('')}
            className="ml-2 text-orange-500 hover:text-orange-600"
          >
            (clear filter)
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;