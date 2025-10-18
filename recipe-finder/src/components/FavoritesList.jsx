import React from 'react';
import RecipeCard from './RecipeCard';

const FavoritesList = ({ favorites, onRecipeClick, onRemoveFromFavorites }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          No favorite recipes yet!
        </div>
        <p className="text-gray-600 dark:text-gray-500">
          Start searching for recipes and add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Your Favorite Recipes ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onClick={() => onRecipeClick(recipe.idMeal)}
            isFavorite={true}
            onRemoveFromFavorites={() => onRemoveFromFavorites(recipe.idMeal)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;