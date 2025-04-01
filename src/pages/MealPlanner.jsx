import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash, FaSave, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const MealPlanner = () => {
  const { isAuthenticated } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecipePicker, setShowRecipePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];


  useEffect(() => {
 
    const demoRecipes = [
      {
        _id: '1',
        title: 'Pasta Carbonara',
        cookingTime: 30,
        category: 'main course',
        imageUrl: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80'
      },
      {
        _id: '2',
        title: 'Berry Smoothie',
        cookingTime: 5,
        category: 'beverage',
        imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a90a0754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80'
      },
      {
        _id: '3',
        title: 'Avocado Toast',
        cookingTime: 10,
        category: 'breakfast',
        imageUrl: 'https://images.unsplash.com/photo-1542276867-c7f5032e1835?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80'
      },
      {
        _id: '4',
        title: 'Chocolate Chip Cookies',
        cookingTime: 25,
        category: 'dessert',
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80'
      },
      {
        _id: '5',
        title: 'Mediterranean Salad',
        cookingTime: 15,
        category: 'side dish',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80'
      },
      {
        _id: '6',
        title: 'Beef Tacos',
        cookingTime: 20,
        category: 'dinner',
        imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80'
      }
    ];
    
    setRecipes(demoRecipes);
  }, []);

  
  useEffect(() => {
    if (isAuthenticated) {
      const savedMealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
      setMealPlan(savedMealPlan);
    }
  }, [isAuthenticated]);

  
  function getStartOfWeek(date) {
    const newDate = new Date(date);
    const day = newDate.getDay(); 
    newDate.setDate(newDate.getDate() - day); 
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

 
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };


  const goToPrevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };


  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };


  const openRecipePicker = (dayIndex, mealType) => {
    if (!isAuthenticated) {
      alert('Please log in to plan meals');
      return;
    }
    
    setSelectedDay(dayIndex);
    setSelectedMealType(mealType);
    setShowRecipePicker(true);
    setSearchTerm('');
  };


  const addToMealPlan = (recipe) => {
    const dayDate = new Date(currentWeek);
    dayDate.setDate(dayDate.getDate() + selectedDay);
    const dateKey = dayDate.toISOString().split('T')[0];
    
    const updatedMealPlan = { ...mealPlan };
    
    if (!updatedMealPlan[dateKey]) {
      updatedMealPlan[dateKey] = {};
    }
    
    if (!updatedMealPlan[dateKey][selectedMealType]) {
      updatedMealPlan[dateKey][selectedMealType] = [];
    }
    
   
    if (!updatedMealPlan[dateKey][selectedMealType].some(item => item._id === recipe._id)) {
      updatedMealPlan[dateKey][selectedMealType].push(recipe);
    }
    
    setMealPlan(updatedMealPlan);
    localStorage.setItem('mealPlan', JSON.stringify(updatedMealPlan));
    setShowRecipePicker(false);
  };

 
  const removeFromMealPlan = (dayIndex, mealType, recipeId) => {
    const dayDate = new Date(currentWeek);
    dayDate.setDate(dayDate.getDate() + dayIndex);
    const dateKey = dayDate.toISOString().split('T')[0];
    
    const updatedMealPlan = { ...mealPlan };
    
    if (updatedMealPlan[dateKey] && updatedMealPlan[dateKey][mealType]) {
      updatedMealPlan[dateKey][mealType] = updatedMealPlan[dateKey][mealType].filter(
        recipe => recipe._id !== recipeId
      );
      

      if (updatedMealPlan[dateKey][mealType].length === 0) {
        delete updatedMealPlan[dateKey][mealType];
      }
      
      
      if (Object.keys(updatedMealPlan[dateKey]).length === 0) {
        delete updatedMealPlan[dateKey];
      }
    }
    
    setMealPlan(updatedMealPlan);
    localStorage.setItem('mealPlan', JSON.stringify(updatedMealPlan));
  };

 
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveMealPlan = () => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    alert('Meal plan saved successfully!');
  };


  const generateShoppingList = () => {
    alert('Shopping list generator would be implemented here!');

  };

  const getRecipesForMeal = (dayIndex, mealType) => {
    const dayDate = new Date(currentWeek);
    dayDate.setDate(dayDate.getDate() + dayIndex);
    const dateKey = dayDate.toISOString().split('T')[0];
    
    if (
      mealPlan[dateKey] && 
      mealPlan[dateKey][mealType]
    ) {
      return mealPlan[dateKey][mealType];
    }
    
    return [];
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <div className="mb-6 text-primary">
          <FaCalendarAlt size={60} className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to use the meal planner</h1>
        <p className="text-gray-600 mb-6">Plan your meals for the week and automatically generate shopping lists.</p>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
          <FaArrowLeft />
          <span>Back to recipes</span>
        </Link>
        
        <div className="flex gap-2">
          <button 
            onClick={saveMealPlan}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <FaSave />
            <span>Save Plan</span>
          </button>
          <button 
            onClick={generateShoppingList}
            className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
          >
            <FaCalendarAlt />
            <span>Generate Shopping List</span>
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Weekly Meal Planner</h1>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={goToPrevWeek}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          Previous Week
        </button>
        
        <h2 className="text-xl font-semibold">
          Week of {formatDate(currentWeek)}
        </h2>
        
        <button 
          onClick={goToNextWeek}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          Next Week
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100"></th>
              {dayNames.map((day, index) => {
                const date = new Date(currentWeek);
                date.setDate(date.getDate() + index);
                
                return (
                  <th key={index} className="border p-2 bg-gray-100">
                    <div className="font-semibold">{day}</div>
                    <div className="text-sm text-gray-500">{formatDate(date)}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((mealType) => (
              <tr key={mealType}>
                <td className="border p-2 bg-gray-50 font-medium capitalize">
                  {mealType}
                </td>
                {dayNames.map((_, dayIndex) => (
                  <td key={dayIndex} className="border p-2 align-top min-w-[150px]">
                    <div className="min-h-[100px]">
                      {getRecipesForMeal(dayIndex, mealType).map((recipe) => (
                        <div 
                          key={recipe._id} 
                          className="mb-2 bg-white p-2 rounded-md shadow-sm flex justify-between items-center"
                        >
                          <Link 
                            to={`/recipe/${recipe._id}`}
                            className="text-primary hover:underline"
                          >
                            {recipe.title}
                          </Link>
                          <button
                            onClick={() => removeFromMealPlan(dayIndex, mealType, recipe._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        onClick={() => openRecipePicker(dayIndex, mealType)}
                        className="mt-2 w-full flex items-center justify-center gap-1 p-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        <FaPlus size={10} />
                        <span>Add</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Recipe picker modal */}
      {showRecipePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Select a Recipe</h2>
              <input
                type="text"
                placeholder="Search recipes..."
                className="input w-full mt-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="overflow-y-auto flex-1 p-4">
              {filteredRecipes.length > 0 ? (
                <div className="grid gap-3">
                  {filteredRecipes.map(recipe => (
                    <div 
                      key={recipe._id}
                      className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => addToMealPlan(recipe)}
                    >
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                        <img 
                          src={recipe.imageUrl} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{recipe.title}</h3>
                        <p className="text-sm text-gray-500">
                          {recipe.cookingTime} mins • {recipe.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No recipes found. Try a different search term.</p>
              )}
            </div>
            
            <div className="p-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowRecipePicker(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
