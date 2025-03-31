import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [ingredients, setIngredients] = useState(['']);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
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
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be fetching from your backend
        // const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        // const recipeData = response.data;
        
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
            imageUrl: 'https://source.unsplash.com/random/800x600/?pasta-carbonara'
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
            imageUrl: 'https://source.unsplash.com/random/800x600/?berry-smoothie'
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
            imageUrl: 'https://source.unsplash.com/random/800x600/?avocado-toast'
          }
        };
        
        const recipeData = demoRecipes[id];
        
        if (!recipeData) {
          setError('Recipe not found');
          setLoading(false);
          return;
        }
        
        // Fill the form with the existing recipe data
        reset({
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          category: recipeData.category,
          instructions: recipeData.instructions,
          imageUrl: recipeData.imageUrl
        });
        
        // Set ingredients
        setIngredients(recipeData.ingredients);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRecipeDetails();
  }, [id, reset]);

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredientField = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
      
      if (filteredIngredients.length === 0) {
        alert('At least one ingredient is required');
        setSubmitting(false);
        return;
      }
      
      const recipeData = {
        ...data,
        ingredients: filteredIngredients
      };
      
      // In a real app, this would be updating your backend
      // await axios.put(`http://localhost:5000/api/recipes/${id}`, recipeData);
      
      // For demo purposes, just log the data and navigate
      console.log('Updated Recipe:', recipeData);
      
      setSubmitting(false);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      setSubmitting(false);
      alert('Failed to update recipe. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-10"><div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <Link to={`/recipe/${id}`} className="flex items-center gap-2 text-primary hover:underline">
          <FaArrowLeft />
          <span>Back to recipe</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
              <input
                type="text"
                className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter recipe title"
                {...register('title', { required: 'Recipe title is required' })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                className={`input w-full ${errors.category ? 'border-red-500' : ''}`}
                {...register('category', { required: 'Category is required' })}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              className={`input w-full min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter a brief description of your recipe"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Cooking Time (minutes)</label>
              <input
                type="number"
                className={`input w-full ${errors.cookingTime ? 'border-red-500' : ''}`}
                placeholder="Enter cooking time in minutes"
                min="1"
                {...register('cookingTime', { 
                  required: 'Cooking time is required',
                  min: { value: 1, message: 'Cooking time must be at least 1 minute' }
                })}
              />
              {errors.cookingTime && <p className="text-red-500 text-sm mt-1">{errors.cookingTime.message}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Servings</label>
              <input
                type="number"
                className={`input w-full ${errors.servings ? 'border-red-500' : ''}`}
                placeholder="Enter number of servings"
                min="1"
                {...register('servings', { 
                  required: 'Number of servings is required',
                  min: { value: 1, message: 'Servings must be at least 1' }
                })}
              />
              {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings.message}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="url"
              className="input w-full"
              placeholder="Enter image URL (optional)"
              {...register('imageUrl')}
            />
            <p className="text-sm text-gray-500 mt-1">Leave empty to use a placeholder image</p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-700 font-medium">Ingredients</label>
              <button 
                type="button" 
                onClick={addIngredientField}
                className="text-primary flex items-center gap-1 text-sm"
              >
                <FaPlusCircle />
                <span>Add Ingredient</span>
              </button>
            </div>
            
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="input flex-grow"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  required={index === 0}
                />
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeIngredientField(index)}
                    className="text-red-500"
                  >
                    <FaMinusCircle />
                  </button>
                )}
              </div>
            ))}
            {ingredients.length === 0 && (
              <p className="text-red-500 text-sm">At least one ingredient is required</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Instructions</label>
            <textarea
              className={`input w-full min-h-[200px] ${errors.instructions ? 'border-red-500' : ''}`}
              placeholder="Enter step-by-step instructions for your recipe"
              {...register('instructions', { required: 'Cooking instructions are required' })}
            />
            {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions.message}</p>}
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
