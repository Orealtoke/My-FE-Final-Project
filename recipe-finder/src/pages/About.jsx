import React from "react";

const About = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="max-w-3xl mx-auto p-6 text-gray-700 mt-10">
      <h2 className="text-3xl font-bold text-orange-600 mb-4">About Recipe Finder</h2>
      <p className="mb-4 leading-relaxed">
        The <strong>Recipe Finder</strong> app helps you discover delicious recipes from around
        the world. Simply type a dish name to get ingredients, instructions, and even
        a tutorial video — all powered by
        <a href="https://www.themealdb.com" className="text-orange-500 underline ml-1">
          TheMealDB API
        </a>.
      </p>
      <p className="mb-4 leading-relaxed">
        This project was developed as part of the <strong>ALX Front-End Engineering Capstone</strong>,
        showcasing skills in API integration, React component architecture, and responsive design.
      </p>
      <p>
        💡 <em>Built with love using React, TailwindCSS, and Vite.</em>
      </p>
    </section>
  );
});

export default About;
