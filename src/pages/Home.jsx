import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import ImageWithFallback from '../components/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import DietaryFilter from '../components/DietaryFilter';
import Testimonials from '../components/Testimonials';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState(null);
  const { isAuthenticated } = useAuth();

  const categories = [
    'all',
    'appetizer', 
    'main course', 
    'dessert', 
    'beverage', 
    'side dish', 
    'breakfast', 
    'lunch', 
    'dinner'
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
       
        const demoRecipes = [
          {
            _id: '1',
            title: 'Pasta Carbonara',
            description: 'Creamy Italian pasta with bacon and eggs',
            ingredients: ['spaghetti', 'eggs', 'bacon', 'parmesan cheese', 'black pepper'],
            cookingTime: 30,
            servings: 4,
            category: 'main course',
            imageUrl: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 650,
              protein: 25,
              carbs: 80,
              fat: 28
            },
            dietaryInfo: {
              vegetarian: false,
              vegan: false,
              glutenFree: false,
              dairyFree: false
            }
          },
          {
            _id: '2',
            title: 'Berry Smoothie',
            description: 'Refreshing mixed berry smoothie with yogurt',
            ingredients: ['strawberries', 'blueberries', 'yogurt', 'honey', 'ice'],
            cookingTime: 5,
            servings: 2,
            category: 'beverage',
            imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a90a0754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 210,
              protein: 5,
              carbs: 42,
              fat: 3
            },
            dietaryInfo: {
              vegetarian: true,
              vegan: false,
              glutenFree: true,
              dairyFree: false
            }
          },
          {
            _id: '3',
            title: 'Avocado Toast',
            description: 'Simple and nutritious breakfast toast with avocado',
            ingredients: ['bread', 'avocado', 'salt', 'pepper', 'olive oil'],
            cookingTime: 10,
            servings: 1,
            category: 'breakfast',
            imageUrl: 'https://images.unsplash.com/photo-1542276867-c7f5032e1835?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 320,
              protein: 7,
              carbs: 30,
              fat: 22
            },
            dietaryInfo: {
              vegetarian: true,
              vegan: true,
              glutenFree: false,
              dairyFree: true
            }
          },
          {
            _id: '4',
            title: 'Chocolate Chip Cookies',
            description: 'Classic homemade chocolate chip cookies',
            ingredients: ['flour', 'butter', 'sugar', 'eggs', 'chocolate chips'],
            cookingTime: 25,
            servings: 24,
            category: 'dessert',
            imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 180,
              protein: 2,
              carbs: 24,
              fat: 10
            },
            dietaryInfo: {
              vegetarian: true,
              vegan: false,
              glutenFree: false,
              dairyFree: false
            }
          },
          {
            _id: '5',
            title: 'Mediterranean Salad',
            description: 'Fresh salad with tomatoes, cucumber, olives, and feta cheese',
            ingredients: ['lettuce', 'tomatoes', 'cucumber', 'olives', 'feta cheese', 'olive oil'],
            cookingTime: 15,
            servings: 2,
            category: 'side dish',
            imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 230,
              protein: 8,
              carbs: 12,
              fat: 18
            },
            dietaryInfo: {
              vegetarian: true,
              vegan: false,
              glutenFree: true,
              dairyFree: false
            }
          },
          {
            _id: '6',
            title: 'Beef Tacos',
            description: 'Spicy beef tacos with fresh salsa and guacamole',
            ingredients: ['ground beef', 'taco shells', 'lettuce', 'tomatoes', 'cheese', 'salsa'],
            cookingTime: 20,
            servings: 4,
            category: 'dinner',
            imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 450,
              protein: 28,
              carbs: 32,
              fat: 22
            },
            dietaryInfo: {
              vegetarian: false,
              vegan: false,
              glutenFree: false,
              dairyFree: false
            }
          },
          {
            _id: '7',
            title: 'Quinoa Veggie Bowl',
            description: 'Nutritious quinoa bowl with roasted vegetables and tahini dressing',
            ingredients: ['quinoa', 'sweet potato', 'broccoli', 'chickpeas', 'avocado', 'tahini'],
            cookingTime: 35,
            servings: 2,
            category: 'main course',
            imageUrl: 'https://images.unsplash.com/photo-1546877625-cb8c71916e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 520,
              protein: 18,
              carbs: 72,
              fat: 22
            },
            dietaryInfo: {
              vegetarian: true,
              vegan: true,
              glutenFree: true,
              dairyFree: true
            }
          },
          {
            _id: '8',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy chicken stir fry with vegetables',
            ingredients: ['chicken breast', 'bell peppers', 'broccoli', 'soy sauce', 'ginger', 'garlic'],
            cookingTime: 20,
            servings: 4,
            category: 'dinner',
            imageUrl: 'https://images.unsplash.com/photo-1603094543704-91a18a0444e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            nutrition: {
              calories: 380,
              protein: 32,
              carbs: 18,
              fat: 15
            },
            dietaryInfo: {
              vegetarian: false,
              vegan: false,
              glutenFree: true,
              dairyFree: true
            }
          }
        ];
        
        setRecipes(demoRecipes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === 'all' ? '' : category);
  };

  const handleDietaryFilterChange = (filters) => {
    setDietaryFilters(filters);
  };

  const filteredRecipes = recipes.filter(recipe => {
    // Text search filter
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === '' || recipe.category === selectedCategory;
    
    // Apply dietary filters if they exist
    let matchesDietary = true;
    if (dietaryFilters) {
      // Diet preferences (vegetarian, vegan, etc.)
      for (const [diet, isSelected] of Object.entries(dietaryFilters.diets)) {
        if (isSelected && recipe.dietaryInfo && !recipe.dietaryInfo[diet]) {
          matchesDietary = false;
          break;
        }
      }
      
      // Allergens (exclude recipes with these ingredients)
      if (matchesDietary) {
        for (const [allergen, isSelected] of Object.entries(dietaryFilters.allergens)) {
          if (isSelected && recipe.ingredients && recipe.ingredients.some(i => i.toLowerCase().includes(allergen.toLowerCase()))) {
            matchesDietary = false;
            break;
          }
        }
      }
      
      // Cooking time filters
      if (matchesDietary) {
        const time = recipe.cookingTime;
        if (
          (dietaryFilters.cookingTime.quick && time > 30) ||
          (dietaryFilters.cookingTime.medium && (time < 30 || time > 60)) ||
          (dietaryFilters.cookingTime.long && time < 60)
        ) {
          if (Object.values(dietaryFilters.cookingTime).some(v => v)) {
            matchesDietary = false;
          }
        }
      }
      
      // Nutrition filters
      if (matchesDietary && recipe.nutrition) {
        const { calories, protein, carbs, fat } = recipe.nutrition;
        const { nutritionRange } = dietaryFilters;
        
        if (
          calories < nutritionRange.calories.min || 
          calories > nutritionRange.calories.max ||
          protein < nutritionRange.protein.min || 
          protein > nutritionRange.protein.max ||
          carbs < nutritionRange.carbs.min || 
          carbs > nutritionRange.carbs.max ||
          fat < nutritionRange.fat.min || 
          fat > nutritionRange.fat.max
        ) {
          matchesDietary = false;
        }
      }
    }
    
    return matchesSearch && matchesCategory && matchesDietary;
  });

  if (loading) return (
    <div className="py-10">
      <div className="bg-secondary/10 py-10 px-4 rounded-lg mb-10">
        <div className="max-w-3xl mx-auto">
          <div className="h-10 bg-gray-300 rounded w-2/3 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
          <div className="h-12 bg-gray-300 rounded-full w-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="mb-6 flex justify-between">
        <div className="h-8 bg-gray-300 rounded w-40 animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded w-72 animate-pulse"></div>
      </div>
      
      <SkeletonLoader type="card" count={6} />
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-10 rounded-lg text-center">
      <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
      <p className="mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div>
      <section className="relative bg-gradient-to-r from-primary/90 to-secondary/90 py-16 px-4 rounded-lg mb-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-md">
            Discover <span className="text-yellow-300">Delicious</span> Recipes
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Find, save, and share the best recipes from around the world
          </p>
          
          <div className="relative max-w-xl mx-auto shadow-lg rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="input w-full pl-12 pr-4 py-4 border-2 border-white/30 focus:border-white/50 bg-white/90 backdrop-blur-sm text-primary"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
          </div>
          
          {!isAuthenticated && (
            <div className="mt-6">
              <Link to="/login" className="inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full backdrop-blur-sm transition duration-300 font-medium">
                Sign in to add your own recipes!
              </Link>
            </div>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-2 opacity-90">
            <p className="text-white/80 mr-2 my-auto">Popular searches:</p>
            {['Dinner', 'Quick meals', 'Vegetarian', 'Desserts'].map(term => (
              <button 
                key={term}
                onClick={() => setSearchTerm(term.toLowerCase())} 
                className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">All Recipes</h2>
          
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
            <DietaryFilter onFilterChange={handleDietaryFilterChange} />
            
            <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm ml-0 md:ml-2 overflow-x-auto">
              <FaFilter className="text-gray-500 flex-shrink-0" />
              <div className="flex flex-nowrap gap-2 pb-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 text-sm rounded-full capitalize whitespace-nowrap transition-all ${
                      (category === 'all' && selectedCategory === '') || category === selectedCategory 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-4">Try a different search term or adjust your filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setDietaryFilters(null);
              }} 
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id} className="group card hover:scale-[1.02] shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden relative bg-gray-100">
                  <ImageWithFallback 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    fallbackSrc="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  />
                  <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/60 to-transparent">
                    <span className="inline-block px-2 py-1 bg-primary/90 text-white text-xs rounded-full capitalize">
                      {recipe.category}
                    </span>
                  </div>
                  
                  {/* Overlay with recipe info on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="font-bold text-lg text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{recipe.title}</h3>
                    <p className="text-white/80 text-sm mb-2 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{recipe.description}</p>
                    <div className="flex justify-between items-center text-xs text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {recipe.cookingTime} mins
                      </span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        {recipe.servings}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{recipe.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{recipe.description}</p>
                  
                  {recipe.dietaryInfo && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {recipe.dietaryInfo.vegetarian && (
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Vegetarian</span>
                      )}
                      {recipe.dietaryInfo.vegan && (
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Vegan</span>
                      )}
                      {recipe.dietaryInfo.glutenFree && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">GF</span>
                      )}
                      {recipe.dietaryInfo.dairyFree && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">DF</span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{recipe.cookingTime} mins</span>
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
    </div>
  );
};

export default Home;
