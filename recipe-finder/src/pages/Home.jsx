import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = ({ onSearchClick, onFeaturedRecipeClick, getFeaturedRecipes, favoritesCount, shoppingCount }) => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      setLoading(true);
      const recipes = await getFeaturedRecipes();
      setFeaturedRecipes(recipes);
      setLoading(false);
    };
    
    loadFeaturedRecipes();
  }, [getFeaturedRecipes]);

  const stats = [
    { label: 'Recipes Available', value: '300+', icon: '🍳' },
    { label: 'Global Cuisines', value: '30+', icon: '🌍' },
    { label: 'Your Favorites', value: favoritesCount, icon: '❤️' },
    { label: 'Shopping Items', value: shoppingCount, icon: '🛒' }
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find recipes by name, ingredients, or cuisine type with our powerful search engine.'
    },
    {
      icon: '❤️',
      title: 'Save Favorites',
      description: 'Bookmark your favorite recipes and access them anytime, even offline.'
    },
    {
      icon: '🛒',
      title: 'Shopping Lists',
      description: 'Automatically generate shopping lists from recipes and manage your groceries.'
    },
    {
      icon: '🎥',
      title: 'Video Tutorials',
      description: 'Watch step-by-step cooking videos embedded from YouTube for each recipe.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Perfectly responsive design that works great on all your devices.'
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Comfortable cooking experience with dark mode for low-light conditions.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Amazing 
            <span className="text-orange-500"> Recipes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Explore thousands of delicious recipes from around the world. 
            <br />Cook like a pro with step-by-step instructions and video tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onSearchClick}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🍳 Start Cooking Now
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-lg font-semibold rounded-lg transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Featured Recipes */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Featured Recipes
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => onFeaturedRecipeClick(recipe.idMeal)}
                isFavorite={false}
              />
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <button
            onClick={onSearchClick}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Explore More Recipes
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Why Choose Recipe Finder?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Cooking?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of home cooks discovering new recipes every day.
        </p>
        <button
          onClick={onSearchClick}
          className="px-8 py-4 bg-white text-orange-600 hover:bg-gray-100 text-lg font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          🍽️ Find Your Next Meal
        </button>
      </section>
    </div>
  );
};

export default Home;