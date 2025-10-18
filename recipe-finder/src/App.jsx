import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import ShoppingList from './components/ShoppingList';
import CategoryFilter from './components/CategoryFilter';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('home'); // home, search, favorites, shopping, about

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    const savedShoppingList = localStorage.getItem('recipeShoppingList');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedShoppingList) setShoppingList(JSON.parse(savedShoppingList));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recipeShoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const searchRecipes = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setActiveView('search');
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please check your connection.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setSelectedRecipe(data.meals[0]);
    } catch (err) {
      setError('Failed to fetch recipe details.');
      console.error('Error fetching recipe details:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (recipe) => {
    if (!favorites.find(fav => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
      alert('Recipe added to favorites!');
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(fav => fav.idMeal !== recipeId));
  };

  const addToShoppingList = (ingredients) => {
    const newItems = ingredients.filter(ing => 
      ing.ingredient && !shoppingList.find(item => item.ingredient === ing.ingredient)
    );
    setShoppingList([...shoppingList, ...newItems]);
  };

  const removeFromShoppingList = (index) => {
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const updateShoppingItem = (index, updates) => {
    setShoppingList(shoppingList.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  const printShoppingList = () => {
    const printContent = shoppingList.map(item => 
      `- ${item.ingredient}${item.measure ? `: ${item.measure}` : ''}${item.checked ? ' ✓' : ''}`
    ).join('\n');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Shopping List</title></head>
        <body>
          <h1>Shopping List</h1>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const getFeaturedRecipes = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      ]);
      
      const data = await Promise.all(responses.map(r => r.json()));
      const featuredRecipes = data.map(d => d.meals[0]).filter(Boolean);
      return featuredRecipes;
    } catch (err) {
      console.error('Error fetching featured recipes:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl md:text-3xl font-bold text-orange-500">🍳 Recipe Finder</h1>
              
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveView('home')}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    activeView === 'home' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveView('search')}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    activeView === 'search' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setActiveView('favorites')}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    activeView === 'favorites' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Favorites ({favorites.length})
                </button>
                <button
                  onClick={() => setActiveView('shopping')}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    activeView === 'shopping' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Shopping ({shoppingList.length})
                </button>
                <button
                  onClick={() => setActiveView('about')}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    activeView === 'about' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  About
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {activeView === 'home' && (
          <Home 
            onSearchClick={() => setActiveView('search')}
            onFeaturedRecipeClick={fetchRecipeDetails}
            getFeaturedRecipes={getFeaturedRecipes}
            favoritesCount={favorites.length}
            shoppingCount={shoppingList.length}
          />
        )}

        {activeView === 'search' && (
          <>
            <SearchBar 
              onSearch={searchRecipes} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <CategoryFilter 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {selectedRecipe ? (
              <RecipeDetails 
                recipe={selectedRecipe}
                onBack={() => setSelectedRecipe(null)}
                onAddToFavorites={addToFavorites}
                onAddToShoppingList={addToShoppingList}
                isFavorite={favorites.some(fav => fav.idMeal === selectedRecipe.idMeal)}
              />
            ) : (
              <RecipeList 
                recipes={activeCategory 
                  ? recipes.filter(recipe => recipe.strCategory === activeCategory)
                  : recipes
                }
                onRecipeClick={fetchRecipeDetails}
                favorites={favorites}
                onAddToFavorites={addToFavorites}
                onRemoveFromFavorites={removeFromFavorites}
              />
            )}
          </>
        )}

        {activeView === 'favorites' && (
          <FavoritesList 
            favorites={favorites}
            onRecipeClick={fetchRecipeDetails}
            onRemoveFromFavorites={removeFromFavorites}
          />
        )}

        {activeView === 'shopping' && (
          <ShoppingList 
            items={shoppingList}
            onRemoveItem={removeFromShoppingList}
            onUpdateItem={updateShoppingItem}
            onClearList={clearShoppingList}
            onPrintList={printShoppingList}
          />
        )}

        {activeView === 'about' && (
          <About />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-orange-500">🍳 Recipe Finder</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Discover amazing recipes from around the world
              </p>
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveView('about')}
                className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
              >
                About
              </button>
              <a 
                href="https://www.themealdb.com/api.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
              >
                API Credits
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2024 Recipe Finder. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;