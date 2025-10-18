import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export default function Home() {
  const [query, setQuery] = useState("Arrabiata"); // default example
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rf_favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // initial fetch for default query
    fetchMeals(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMeals = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      setMeals([]);
      setError("Please enter a dish name to search.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
      const data = await res.json();
      if (!data || typeof data !== "object") throw new Error("Invalid API response");
      if (data.meals === null) {
        setMeals([]);
        setError(`No recipes found for "${searchTerm}". Try another name.`);
      } else {
        setMeals(data.meals);
      }
    } catch (err) {
      console.error(err);
      setError("Sorry, an error occurred while fetching recipes. Check your internet connection.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (meal) => {
    const exists = favorites.find(f => f.idMeal === meal.idMeal);
    let updated;
    if (exists) {
      updated = favorites.filter(f => f.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }];
    }
    setFavorites(updated);
    localStorage.setItem("rf_favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={() => fetchMeals(query)}
      />

      {loading && <div className="text-center mt-8">Loading recipes...</div>}

      {error && !loading && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && meals.length > 0 && (
        <>
          <h2 className="mt-6 text-lg font-semibold">Results</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {meals.map(meal => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                isFav={!!favorites.find(f => f.idMeal === meal.idMeal)}
                onToggleFav={() => toggleFavorite(meal)}
              />
            ))}
          </div>
        </>
      )}

      {/* Favorites section (stretch) */}
      {favorites.length > 0 && (
        <section className="mt-10">
          <h3 className="text-lg font-semibold">Favorites</h3>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {favorites.map(f => (
              <div key={f.idMeal} className="border rounded p-2 flex items-center">
                <img src={f.strMealThumb} alt={f.strMeal} className="w-16 h-16 object-cover rounded mr-3" />
                <div>
                  <div className="font-medium">{f.strMeal}</div>
                  <div className="text-xs text-gray-500">Saved</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
