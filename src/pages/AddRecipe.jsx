import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ingredients, setIngredients] = useState(['']);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
      
      const recipeData = {
        ...data,
        ingredients: filteredIngredients
      };
      
      
      console.log('New Recipe:', recipeData);
      
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      setLoading(false);
      alert('Failed to create recipe. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
          <FaArrowLeft />
          <span>Back to recipes</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>
        
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
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
