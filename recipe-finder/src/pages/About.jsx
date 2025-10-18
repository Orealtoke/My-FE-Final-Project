import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: 'Recipe Finder Team',
      role: 'Development Team',
      description: 'Passionate developers creating amazing cooking experiences',
      emoji: '👨‍💻'
    },
    {
      name: 'TheMealDB',
      role: 'API Provider',
      description: 'Providing the extensive recipe database that powers our app',
      emoji: '🍽️'
    },
    {
      name: 'Home Cooks',
      role: 'Our Community',
      description: 'Thousands of cooking enthusiasts sharing their passion',
      emoji: '👩‍🍳'
    }
  ];

  const technologies = [
    { name: 'React', description: 'Modern frontend framework for building user interfaces', icon: '⚛️' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development', icon: '🎨' },
    { name: 'TheMealDB API', description: 'Free recipe API with thousands of recipes from around the world', icon: '🌐' },
    { name: 'Local Storage', description: 'Browser storage for saving favorites and shopping lists', icon: '💾' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About <span className="text-orange-500">Recipe Finder</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Recipe Finder is your ultimate companion in the kitchen, designed to make cooking 
          enjoyable and accessible for everyone. From beginners to seasoned chefs, our platform 
          provides everything you need to discover, save, and create amazing meals.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Our Mission
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Simplify Cooking</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Make complex recipes accessible with clear instructions and video guides
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Global Cuisine</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore diverse culinary traditions from around the world in one place
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Features</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Save time with automated shopping lists and personalized favorites
            </p>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          What We Offer
        </h2>
        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-orange-500 mb-3">🔍 Advanced Search</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for with our powerful search functionality. 
              Search by recipe name, ingredients, or browse by categories and cuisines.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-orange-500 mb-3">❤️ Personal Favorites</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build your personal cookbook by saving favorite recipes. Your collection is 
              stored locally and persists between sessions.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-orange-500 mb-3">🛒 Smart Shopping Lists</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically generate shopping lists from recipes. Edit quantities, 
              check off items as you shop, and print your list for the grocery store.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-orange-500 mb-3">🎥 Video Tutorials</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn visually with embedded YouTube tutorials for many recipes. 
              Watch step-by-step instructions from expert chefs.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{tech.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tech.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Contributors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl mb-4">{member.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <div className="text-orange-500 font-semibold mb-3">{member.role}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* API Credits */}
      <section className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          API Credits
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This application uses the free API provided by{' '}
          <a 
            href="https://www.themealdb.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            TheMealDB
          </a>
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          TheMealDB provides an extensive database of recipes from around the world, 
          complete with ingredients, instructions, and video tutorials.
        </p>
      </section>

      {/* Contact/Support */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Have Questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're constantly improving Recipe Finder. If you have suggestions or encounter any issues, 
          we'd love to hear from you.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
            📧 Contact Support
          </button>
          <button className="px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors">
            💡 Suggest Feature
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;