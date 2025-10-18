import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

function extractIngredients(meal) {
  // TheMealDB returns fields strIngredient1..20 and strMeasure1..20
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push({
        ingredient: ing,
        measure: measure ? measure : ""
      });
    }
  }
  return ingredients;
}

export default function Details() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No recipe specified.");
      setLoading(false);
      return;
    }

    const fetchMeal = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const data = await res.json();
        if (!data || !data.meals || data.meals.length === 0) {
          setError("Recipe not found.");
        } else {
          setMeal(data.meals[0]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recipe. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <div className="text-center">Loading recipe...</div>;
  if (error) return <div className="text-center text-red-600">{error} <div className="mt-4"><Link to="/" className="text-emerald-600 hover:underline">Back to search</Link></div></div>;
  if (!meal) return null;

  const ingredients = extractIngredients(meal);
  // embed youtube if available
  let youtubeEmbed = null;
  if (meal.strYoutube) {
    try {
      const url = new URL(meal.strYoutube);
      const idParam = url.searchParams.get("v");
      const ytId = idParam || url.pathname.split("/").pop();
      if (ytId) {
        youtubeEmbed = `https://www.youtube.com/embed/${ytId}`;
      }
    } catch {
      youtubeEmbed = null;
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full md:w-1/3 h-auto object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
          <p className="text-sm text-gray-500 mt-1">{meal.strCategory} • {meal.strArea}</p>

          <section className="mt-4">
            <h3 className="font-semibold">Ingredients</h3>
            <ul className="mt-2 list-disc list-inside">
              {ingredients.map((it, idx) => (
                <li key={idx}>{it.measure} {it.ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className="font-semibold">Preparation</h3>
            <p className="mt-2 whitespace-pre-line">{meal.strInstructions}</p>
          </section>

          {youtubeEmbed && (
            <section className="mt-4">
              <h3 className="font-semibold">Video</h3>
              <div className="mt-2 aspect-video">
                <iframe
                  title="Recipe video"
                  src={youtubeEmbed}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64"
                ></iframe>
              </div>
            </section>
          )}

          {meal.strSource && (
            <div className="mt-4">
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                View source
              </a>
            </div>
          )}

          <div className="mt-6">
            <Link to="/" className="inline-block px-4 py-2 border rounded hover:bg-gray-50">Back to search</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
