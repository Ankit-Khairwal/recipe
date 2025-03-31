# Recipe App

A full-stack web application for creating, sharing, and managing recipes. Users can browse recipes, create their own, bookmark favorites, and plan meals.

## Features

- **Recipe Management**: Create, view, edit, and delete recipes
- **Recipe Search**: Find recipes by name, description, or ingredients
- **Category Filtering**: Browse recipes by categories
- **User Authentication**: Secure login and signup functionality
- **Bookmarks**: Save favorite recipes for quick access
- **Meal Planner**: Plan your meals throughout the week

## Tech Stack

### Frontend
- React 19
- React Router 6 for navigation
- Tailwind CSS for styling
- Vite as the build tool
- React Hook Form for form management
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB database with Mongoose ODM
- RESTful API architecture
- CORS for cross-origin resource sharing
- Environment variables with dotenv

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Setup Instructions

1. **Clone the repository**

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Set up the frontend**
   ```bash
   # From the root directory
   npm install
   ```

4. **Run the application**

   Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

   Start the frontend development server:
   ```bash
   # From the root directory
   npm run dev
   ```

5. **Access the application**
   
   Open your browser and navigate to: `http://localhost:5173`

## Usage

1. **Browse Recipes**: View all recipes on the home page
2. **Search**: Use the search bar to find specific recipes
3. **Create Account**: Sign up to create your own profile
4. **Add Recipes**: Create your own recipes with ingredients, instructions, and images
5. **Bookmark**: Save your favorite recipes to your bookmarks
6. **Meal Planning**: Plan your meals for the week

## API Endpoints

- **GET /api/recipes**: Get all recipes
- **GET /api/recipes/:id**: Get a specific recipe
- **POST /api/recipes**: Create a new recipe
- **PUT /api/recipes/:id**: Update a recipe
- **DELETE /api/recipes/:id**: Delete a recipe
- **GET /api/recipes/category/:category**: Get recipes by category
- **GET /api/recipes/search/:query**: Search for recipes

## License

ISC
