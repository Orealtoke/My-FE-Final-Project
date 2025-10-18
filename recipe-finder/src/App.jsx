import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-600">Recipe Finder</Link>
          <nav>
            <Link to="/" className="mr-4 hover:underline">Home</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<Details />} />
          <Route path="*" element={<div className="text-center py-20">Page not found</div>} />
        </Routes>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Built with ❤️ • Data from TheMealDB
        </div>
      </footer>
    </div>
  );
}
