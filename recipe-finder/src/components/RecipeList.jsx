import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onRecipeClick, favorites, onAddToFavorites, onRemoveFromFavorites }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          No recipes found. Try searching for something else!
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={() => onRecipeClick(recipe.idMeal)}
          isFavorite={favorites.some(fav => fav.idMeal === recipe.idMeal)}
          onAddToFavorites={() => onAddToFavorites(recipe)}
          onRemoveFromFavorites={() => onRemoveFromFavorites(recipe.idMeal)}
        />
      ))}
    </div>
  );
};

export default RecipeList;