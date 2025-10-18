import React from 'react';

const RecipeCard = ({ recipe, onClick, isFavorite = false, onAddToFavorites, onRemoveFromFavorites }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite && onRemoveFromFavorites) {
      onRemoveFromFavorites();
    } else if (onAddToFavorites) {
      onAddToFavorites();
    }
  };

  const showFavoriteButton = onAddToFavorites || onRemoveFromFavorites;

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-1">
          {recipe.strMeal}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
            {recipe.strCategory}
          </span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
            {recipe.strArea}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          Click to view recipe details, ingredients, and instructions.
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;