import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ meal, isFav, onToggleFav }) {
  return (
    <div className="border rounded overflow-hidden shadow-sm bg-white flex flex-col">
      <Link to={`/meal/${meal.idMeal}`} className="block">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/meal/${meal.idMeal}`} className="flex-1">
          <h4 className="font-semibold text-lg">{meal.strMeal}</h4>
          <p className="text-sm text-gray-500 mt-1">
            {meal.strCategory || "Category"} • {meal.strArea || "Cuisine"}
          </p>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <Link to={`/meal/${meal.idMeal}`} className="text-sm text-emerald-600 hover:underline">View details</Link>

          <button
            onClick={onToggleFav}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            type="button"
          >
            {isFav ? "★ Favorited" : "☆ Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}
