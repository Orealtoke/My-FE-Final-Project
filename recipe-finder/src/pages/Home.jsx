import React, { useEffect, useState } from 'react';

export default function Home({ onSearchClick, getFeaturedRecipes = async () => [], onFeaturedRecipeClick }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getFeaturedRecipes();
      if (mounted) setFeatured(data);
    })();
    return () => { mounted = false; };
  }, [getFeaturedRecipes]);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Welcome to Recipe Finder</h2>
        <p className="text-gray-600 mt-2">Find recipes, save favorites, and build shopping lists.</p>
        <button
          onClick={onSearchClick}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Start Searching
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Featured Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.length === 0 && <p className="text-sm text-gray-500">No featured recipes yet.</p>}
          {featured.map(r => (
            <div key={r.idMeal} className="p-3 border rounded hover:shadow">
              <h4 className="font-medium">{r.strMeal}</h4>
              <p className="text-sm text-gray-500">{r.strArea} — {r.strCategory}</p>
              <button
                onClick={() => onFeaturedRecipeClick(r.idMeal)}
                className="mt-2 text-sm text-orange-500"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
