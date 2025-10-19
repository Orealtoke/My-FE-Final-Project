import React from 'react';

const RecipeDetails = ({ recipe, onBack, onAddToFavorites, onAddToShoppingList, isFavorite }) => {
  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }

  const handleAddToShoppingList = () => {
    onAddToShoppingList(ingredients);
    alert('Ingredients added to shopping list!');
  };

  const handleAddToFavorites = () => {
    onAddToFavorites(recipe);
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(recipe.strYoutube);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-orange-500 hover:text-orange-600 transition-colors"
      >
        ← Back to recipes
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header with image and basic info */}
        <div className="relative">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.strMeal}</h1>
              <div className="flex flex-wrap gap-3">
                <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
                  {recipe.strCategory}
                </span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  {recipe.strArea} Cuisine
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
          <button
            onClick={handleAddToFavorites}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isFavorite 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
          <button
            onClick={handleAddToShoppingList}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            🛒 Add Ingredients to Shopping List
          </button>
          {recipe.strSource && (
            <a
              href={recipe.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              🔗 View Original Recipe
            </a>
          )}
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ingredients</h2>
            <ul className="space-y-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-gray-900 dark:text-white">
                    <strong>{item.ingredient}</strong>
                    {item.measure && ` - ${item.measure}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Instructions</h2>
            <div className="prose dark:prose-invert max-w-none">
              {recipe.strInstructions.split('\n').map((step, index) => (
                step.trim() && (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg text-orange-500 dark:text-orange-400">
                      Step {index + 1}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step.trim()}
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* YouTube Video */}
        {youtubeId && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Video Tutorial</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Recipe Video"
                className="w-full h-64 md:h-96 rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
