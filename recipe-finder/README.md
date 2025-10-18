🍳 Recipe Finder

A simple and responsive web app that allows users to search for recipes by name and view quick details such as ingredients and preparation steps.
Built with React, Vite, and Tailwind CSS, this project demonstrates core frontend development concepts — API integration, component structure, and modern UI design.

FEATURES

Recipe Search: Search for recipes using keywords.

Recipe Details: Displays ingredients and cooking instructions.

Responsive Design: Fully responsive and mobile-friendly layout.

Fast Setup: Built using Vite for lightning-fast development and builds.

Styled with Tailwind CSS 4: Modern, utility-first CSS styling.

 INSTALLATION AND SETUP

1. Clone the repository
git clone https://github.com/<Orealtoke>/My-FE-Final-PRoject.git

2. npm create vite@latest recipe-finder -- --template react
cd recipe-finder

3. Install dependencies
npm install

4. Run the development server
npm run dev


Then open my browser at http://localhost:5173


🛠️ Tech Stack
Technology	Purpose
React	Component-based UI library
Vite	Frontend build tool and dev server
Tailwind CSS v4	Utility-first styling framework
TheMealDB API (or similar)	Public recipe data source
📂 Project Structure
recipe-finder/
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── /src
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── /components
│   │   ├── SearchBar.jsx
│   │   ├── RecipeCard.jsx
│   │   └── RecipeList.jsx
│   └── /assets
└── /public


🧠 How It Works

User enters a recipe name in the search bar.

App fetches data from a public recipe API (like TheMealDB
).

Results are displayed as interactive recipe cards.

Clicking on a card shows more information (optional feature).

📸 Screenshots

(Add images later after UI is complete)
Example:

🧑‍💻 Author

Khadijat Oritoke Animashaun
Frontend Engineer (ALX Program)
🔗 GitHub

💬 Passionate about building clean, responsive, and user-friendly web applications.

📜 License

This project is open source and available under the MIT License.