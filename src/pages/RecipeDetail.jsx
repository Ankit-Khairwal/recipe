import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaEdit, FaTrash, FaArrowLeft, FaPrint } from 'react-icons/fa';
import axios from 'axios';
import ImageWithFallback from '../components/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import CommentSection from '../components/CommentSection';
import BookmarkButton from '../components/BookmarkButton';
import ShareRecipe from '../components/ShareRecipe';
import NutritionCalculator from '../components/NutritionCalculator';
import CookingMode from '../components/CookingMode';
import SkeletonLoader from '../components/SkeletonLoader';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be fetching from your backend
        // const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        // setRecipe(response.data);
        
        // For demo purposes, using placeholder data
        const demoRecipes = {
          '1': {
            _id: '1',
            title: 'Pasta Carbonara',
            description: 'Creamy Italian pasta with bacon and eggs. A classic Roman dish that combines crispy bacon, eggs, and Parmesan cheese for a rich and satisfying meal.',
            ingredients: ['200g spaghetti', '100g bacon or pancetta, diced', '2 large eggs', '50g grated Parmesan cheese', 'Freshly ground black pepper', 'Salt to taste', '1 clove garlic, minced (optional)'],
            instructions: '1. Cook the pasta in salted water according to package instructions until al dente.\n\n2. While the pasta is cooking, fry the bacon in a large pan until crispy.\n\n3. In a bowl, beat the eggs and mix in the grated Parmesan cheese and black pepper.\n\n4. When the pasta is done, drain it quickly, reserving a small cup of the pasta water.\n\n5. While the pasta is still hot, add it to the pan with the bacon, tossing quickly to coat the pasta.\n\n6. Remove the pan from heat and quickly pour in the egg and cheese mixture, stirring continuously to prevent the eggs from scrambling.\n\n7. If needed, add a splash of the reserved pasta water to create a creamy sauce.\n\n8. Serve immediately with extra grated Parmesan and black pepper on top.',
            cookingTime: 30,
            servings: 4,
            category: 'main course',
            imageUrl: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.5, count: 12 },
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
          '2': {
            _id: '2',
            title: 'Berry Smoothie',
            description: 'Refreshing mixed berry smoothie with yogurt. This vibrant smoothie is packed with antioxidants and makes for a perfect quick breakfast or healthy snack.',
            ingredients: ['1 cup mixed berries (strawberries, blueberries, raspberries)', '1/2 cup Greek yogurt', '1 tablespoon honey or maple syrup', '1/2 cup milk or plant-based alternative', 'Ice cubes', '1 tablespoon chia seeds (optional)'],
            instructions: '1. Add all the ingredients to a blender.\n\n2. Blend on high speed until smooth and creamy.\n\n3. If the smoothie is too thick, add more milk; if too thin, add more fruit or ice.\n\n4. Pour into glasses and serve immediately.\n\n5. Optional: top with additional berries or a sprinkle of chia seeds.',
            cookingTime: 5,
            servings: 2,
            category: 'beverage',
            imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a90a0754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.8, count: 8 },
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
          '3': {
            _id: '3',
            title: 'Avocado Toast',
            description: 'Simple and nutritious breakfast toast with avocado. This trendy breakfast is not only Instagram-worthy but also packed with healthy fats and nutrients to start your day right.',
            ingredients: ['2 slices of bread (sourdough or whole grain)', '1 ripe avocado', 'Salt and pepper to taste', 'Red pepper flakes (optional)', '1/2 lemon, juiced', 'Extra virgin olive oil for drizzling', '2 eggs (optional, for topping)'],
            instructions: '1. Toast the bread slices until golden and crisp.\n\n2. Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.\n\n3. Mash the avocado with a fork, adding lemon juice, salt, and pepper to taste.\n\n4. Spread the mashed avocado evenly on the toast slices.\n\n5. If desired, top with a poached or fried egg.\n\n6. Drizzle with olive oil and sprinkle with red pepper flakes or other desired toppings.\n\n7. Serve immediately.',
            cookingTime: 10,
            servings: 1,
            category: 'breakfast',
            imageUrl: 'https://images.unsplash.com/photo-1542276867-c7f5032e1835?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.2, count: 15 },
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
          '4': {
            _id: '4',
            title: 'Chocolate Chip Cookies',
            description: 'Classic homemade chocolate chip cookies. Crispy on the outside, chewy on the inside - these timeless treats are perfect for any occasion and guaranteed to bring smiles.',
            ingredients: ['2 1/4 cups all-purpose flour', '1 cup unsalted butter, softened', '3/4 cup granulated sugar', '3/4 cup packed brown sugar', '2 large eggs', '2 tsp vanilla extract', '1 tsp baking soda', '1/2 tsp salt', '2 cups chocolate chips'],
            instructions: '1. Preheat oven to 375°F (190°C).\n\n2. In a small bowl, mix flour, baking soda, and salt.\n\n3. In a large bowl, cream together butter and both sugars until smooth.\n\n4. Beat in eggs and vanilla.\n\n5. Gradually blend in the dry ingredients.\n\n6. Stir in chocolate chips.\n\n7. Drop tablespoon-sized dough balls onto ungreased baking sheets.\n\n8. Bake for 9 to 11 minutes or until golden brown.\n\n9. Let stand on baking sheet for 2 minutes before removing to cool on wire racks.',
            cookingTime: 25,
            servings: 24,
            category: 'dessert',
            imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.9, count: 26 },
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
          '5': {
            _id: '5',
            title: 'Mediterranean Salad',
            description: 'Fresh salad with tomatoes, cucumber, olives, and feta cheese. This vibrant Mediterranean-inspired dish is refreshing, healthy, and bursting with flavors.',
            ingredients: ['2 cups mixed greens or romaine lettuce', '1 cup cherry tomatoes, halved', '1 cucumber, diced', '1/2 cup Kalamata olives, pitted', '1/2 cup feta cheese, crumbled', '1/4 red onion, thinly sliced', '2 tbsp extra virgin olive oil', '1 tbsp lemon juice', 'Salt and black pepper to taste', '1 tsp dried oregano'],
            instructions: '1. In a large bowl, combine all the vegetables: lettuce, tomatoes, cucumber, olives, and red onion.\n\n2. In a small bowl, whisk together olive oil, lemon juice, salt, pepper, and oregano to make the dressing.\n\n3. Pour the dressing over the salad and toss gently to coat.\n\n4. Sprinkle the crumbled feta cheese on top.\n\n5. Serve immediately for best freshness.',
            cookingTime: 15,
            servings: 2,
            category: 'side dish',
            imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.3, count: 11 },
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
          '6': {
            _id: '6',
            title: 'Beef Tacos',
            description: 'Spicy beef tacos with fresh salsa and guacamole. These flavorful tacos feature perfectly seasoned ground beef and colorful toppings for a festive Mexican-inspired meal.',
            ingredients: ['1 lb ground beef', '8 taco shells', '1 packet taco seasoning', '1 cup lettuce, shredded', '1 cup tomatoes, diced', '1/2 cup cheddar cheese, shredded', '1/4 cup sour cream', 'Salsa and guacamole for serving'],
            instructions: '1. Brown the ground beef in a skillet over medium heat until no longer pink.\n\n2. Drain excess fat, then add taco seasoning and water according to packet instructions.\n\n3. Simmer for 5-10 minutes until sauce thickens.\n\n4. Meanwhile, warm the taco shells according to package directions.\n\n5. Fill each shell with seasoned beef and top with lettuce, tomatoes, and cheese.\n\n6. Serve with sour cream, salsa, and guacamole on the side.',
            cookingTime: 20,
            servings: 4,
            category: 'dinner',
            imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.6, count: 18 },
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
          '7': {
            _id: '7',
            title: 'Quinoa Veggie Bowl',
            description: 'Nutritious quinoa bowl with roasted vegetables and tahini dressing',
            ingredients: ['quinoa', 'sweet potato', 'broccoli', 'chickpeas', 'avocado', 'tahini'],
            cookingTime: 35,
            servings: 2,
            category: 'main course',
            imageUrl: 'https://images.unsplash.com/photo-1546877625-cb8c71916e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.7, count: 9 },
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
          '8': {
            _id: '8',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy chicken stir fry with vegetables',
            ingredients: ['chicken breast', 'bell peppers', 'broccoli', 'soy sauce', 'ginger', 'garlic'],
            cookingTime: 20,
            servings: 4,
            category: 'dinner',
            imageUrl: 'https://images.unsplash.com/photo-1603094543704-91a18a0444e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80',
            ratings: { average: 4.5, count: 14 },
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
        };
        
        setRecipe(demoRecipes[id]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        // In a real app, this would delete from your backend
        // await axios.delete(`http://localhost:5000/api/recipes/${id}`);
        
        navigate('/');
      } catch (err) {
        console.error('Error deleting recipe:', err);
        alert('Failed to delete recipe');
      }
    }
  };
  
  const handleRatingChange = (rating) => {
    // In a real app, this would update ratings in your backend
    console.log(`Rating updated to ${rating} for recipe ${id}`);
  };
  
  const handlePrint = () => {
    window.print();
  };

  if (loading) return <SkeletonLoader type="detail" />;
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
  if (!recipe) return (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-2xl font-bold mb-2">Recipe Not Found</h2>
      <p className="text-gray-500 mb-4">The recipe you're looking for doesn't exist or has been removed.</p>
      <Link to="/" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors inline-block">
        Back to Recipes
      </Link>
    </div>
  );

  return (
    <div className="print:bg-white print:p-4">
      <div className="mb-6 print:hidden">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
          <FaArrowLeft />
          <span>Back to recipes</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96 md:h-[500px] print:h-64">
          <ImageWithFallback 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
            fallbackSrc="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
          
          {/* Title and category in image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-primary/80 text-white text-sm rounded-full mb-3 capitalize">
              {recipe.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-shadow-lg">{recipe.title}</h1>
            <p className="text-white/90 text-shadow max-w-3xl">{recipe.description}</p>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2 print:hidden">
            {isAuthenticated && (
              <>
                <Link 
                  to={`/edit-recipe/${recipe._id}`} 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <FaEdit className="text-secondary" size={18} />
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <FaTrash className="text-red-500" size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
              <FaClock className="text-primary" />
              <span>{recipe.cookingTime} minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
              <FaUtensils className="text-primary" />
              <span>{recipe.servings} servings</span>
            </div>
            
            {recipe.dietaryInfo && (
              <div className="flex flex-wrap gap-1 ml-auto">
                {recipe.dietaryInfo.vegetarian && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Vegetarian</span>
                )}
                {recipe.dietaryInfo.vegan && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Vegan</span>
                )}
                {recipe.dietaryInfo.glutenFree && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Gluten Free</span>
                )}
                {recipe.dietaryInfo.dairyFree && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Dairy Free</span>
                )}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 ml-auto print:hidden">
              <BookmarkButton recipeId={recipe._id} recipeTitle={recipe.title} />
              <ShareRecipe recipeId={recipe._id} recipeTitle={recipe.title} />
              <button 
                onClick={handlePrint}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <FaPrint />
                <span>Print</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 print:hidden mb-8">
            <div className="flex items-center">
              <div className="text-yellow-400 flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {recipe.ratings.average} ({recipe.ratings.count} ratings)
              </span>
            </div>
            
            <StarRating
              initialRating={0}
              recipeId={recipe._id}
              onRatingChange={handleRatingChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-2">1</span>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="print:hidden">
              {recipe.nutrition && (
                <div className="bg-gray-50 p-6 rounded-lg h-full">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Nutrition (per serving)
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                      <div className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</div>
                      <div className="text-sm text-gray-500">Calories</div>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                      <div className="text-2xl font-bold text-primary">{recipe.nutrition.protein}g</div>
                      <div className="text-sm text-gray-500">Protein</div>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                      <div className="text-2xl font-bold text-primary">{recipe.nutrition.carbs}g</div>
                      <div className="text-sm text-gray-500">Carbs</div>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm text-center">
                      <div className="text-2xl font-bold text-primary">{recipe.nutrition.fat}g</div>
                      <div className="text-sm text-gray-500">Fat</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-2">2</span>
              Instructions
            </h2>
            <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-6 rounded-lg">
              {recipe.instructions}
            </div>
          </div>
          
          <div className="print:hidden mb-10">
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Advanced Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary/5 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Nutrition Calculator
                  </h3>
                  <NutritionCalculator recipeIngredients={recipe.ingredients} />
                </div>
                <div className="bg-secondary/5 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cooking Mode
                  </h3>
                  <CookingMode recipe={recipe} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="print:hidden mt-10">
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold mb-6">Comments & Reviews</h2>
              <CommentSection recipeId={recipe._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
