import { useState, useEffect } from 'react';
import { FaCalculator, FaInfoCircle } from 'react-icons/fa';

// Sample nutrition database (in a real app, this would be much more comprehensive)
const nutritionDatabase = {
  // Proteins
  'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 17, unit: '100g' },
  'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13, unit: '100g' },
  'tofu': { calories: 76, protein: 8, carbs: 2, fat: 4.5, unit: '100g' },
  'eggs': { calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: 'large egg' },
  
  // Dairy
  'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1, unit: '100ml' },
  'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33, unit: '100g' },
  'yogurt': { calories: 59, protein: 3.5, carbs: 5, fat: 3.3, unit: '100g' },
  
  // Grains
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: '100g cooked' },
  'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1, unit: '100g cooked' },
  'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2, unit: '100g' },
  'flour': { calories: 364, protein: 10, carbs: 76, fat: 1, unit: '100g' },
  
  // Vegetables
  'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, unit: '100g' },
  'tomatoes': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, unit: '100g' },
  'cucumber': { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, unit: '100g' },
  'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, unit: '100g' },
  'garlic': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, unit: '100g' },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, unit: '100g' },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: '100g' },
  'carrots': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, unit: '100g' },
  
  // Fruits
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: 'medium' },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: 'medium' },
  'strawberries': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, unit: '100g' },
  'blueberries': { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, unit: '100g' },
  
  // Nuts and Seeds
  'almonds': { calories: 579, protein: 21, carbs: 22, fat: 50, unit: '100g' },
  'walnuts': { calories: 654, protein: 15, carbs: 14, fat: 65, unit: '100g' },
  'chia seeds': { calories: 486, protein: 17, carbs: 42, fat: 31, unit: '100g' },
  
  // Oils
  'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100, unit: '100g' },
  'butter': { calories: 717, protein:.9, carbs: 0.1, fat: 81, unit: '100g' },
  
  // Condiments and Others
  'sugar': { calories: 387, protein: 0, carbs: 100, fat: 0, unit: '100g' },
  'honey': { calories: 304, protein: 0.3, carbs: 82, fat: 0, unit: '100g' },
  'salt': { calories: 0, protein: 0, carbs: 0, fat: 0, unit: 'tsp' },
  'pepper': { calories: 251, protein: 10, carbs: 64, fat: 3.3, unit: '100g' },
  'soy sauce': { calories: 53, protein: 5.6, carbs: 4.9, fat: 0.6, unit: '100ml' },
};

const NutritionCalculator = ({ recipeIngredients = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [ingredientMatches, setIngredientMatches] = useState({});
  const [servings, setServings] = useState(1);
  
  useEffect(() => {
    if (recipeIngredients.length > 0) {
      const matches = {};
      
      // Match ingredients with our nutrition database
      recipeIngredients.forEach(ingredient => {
        const words = ingredient.toLowerCase().split(' ').filter(word => word.length > 2);
        
        // Try to find matching ingredients in our database
        for (const word of words) {
          for (const [key, value] of Object.entries(nutritionDatabase)) {
            if (word === key || key.includes(word) || word.includes(key)) {
              matches[ingredient] = { 
                matched: key,
                ...value,
                quantity: estimateQuantity(ingredient, key)
              };
              break;
            }
          }
          // Break after finding a match
          if (matches[ingredient]) break;
        }
        
        // If no match found, add a placeholder
        if (!matches[ingredient]) {
          matches[ingredient] = { 
            matched: null,
            calories: 0, 
            protein: 0, 
            carbs: 0, 
            fat: 0,
            quantity: 1,
            unit: 'unknown'
          };
        }
      });
      
      setIngredientMatches(matches);
      calculateTotalNutrition(matches);
    }
  }, [recipeIngredients]);
  
  // Estimate quantity from ingredient text (very simplified)
  const estimateQuantity = (ingredient, matchedItem) => {
    // This is a very simplified estimation that would be much more sophisticated in a real app
    const text = ingredient.toLowerCase();
    
    // Check for common measurements
    if (text.includes('cup')) return text.includes('1/2') ? 0.5 : 1;
    if (text.includes('tbsp') || text.includes('tablespoon')) return 0.06; // Approx 100g * 0.06 = 6g
    if (text.includes('tsp') || text.includes('teaspoon')) return 0.02; // Approx 100g * 0.02 = 2g
    if (text.includes('g') || text.includes('gram')) {
      const matches = text.match(/(\d+)\s*g/);
      if (matches && matches[1]) return parseInt(matches[1]) / 100; // Convert to 100g units
    }
    
    // Look for numbers
    const numbers = text.match(/(\d+)/);
    if (numbers && numbers[1]) {
      const num = parseInt(numbers[1]);
      if (num < 10) return num; // Assume it's a count (e.g., 2 eggs)
    }
    
    return 1; // Default multiplier
  };
  
  // Calculate total nutrition values
  const calculateTotalNutrition = (matches) => {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    
    Object.values(matches).forEach(item => {
      totals.calories += (item.calories * item.quantity) || 0;
      totals.protein += (item.protein * item.quantity) || 0;
      totals.carbs += (item.carbs * item.quantity) || 0;
      totals.fat += (item.fat * item.quantity) || 0;
    });
    
    setNutritionData(totals);
  };
  
  // Get per-serving nutrition
  const getPerServing = (value) => {
    if (!value) return 0;
    return Math.round(value / servings);
  };

  if (recipeIngredients.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors w-full justify-center"
      >
        <FaCalculator />
        <span>{isOpen ? 'Hide Nutrition Information' : 'Calculate Nutrition Information'}</span>
      </button>
      
      {isOpen && nutritionData && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Nutrition Facts</h3>
              <div className="flex items-center gap-2">
                <label htmlFor="servings" className="text-sm">Servings:</label>
                <input
                  id="servings"
                  type="number"
                  min="1"
                  max="20"
                  value={servings}
                  onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 p-1 border rounded text-center"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <FaInfoCircle className="inline-block mr-1" />
              Estimated values based on ingredients. Actual nutrition may vary.
            </p>
          </div>
          
          <div className="p-4">
            <div className="border-b pb-2 mb-2">
              <div className="text-lg font-bold">Per Serving</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold">{getPerServing(nutritionData.calories)}</div>
                <div className="text-gray-500">Calories</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-bold">{getPerServing(nutritionData.protein)}g</div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
                <div>
                  <div className="font-bold">{getPerServing(nutritionData.carbs)}g</div>
                  <div className="text-xs text-gray-500">Carbs</div>
                </div>
                <div>
                  <div className="font-bold">{getPerServing(nutritionData.fat)}g</div>
                  <div className="text-xs text-gray-500">Fat</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="border-t pt-2 font-medium">Ingredient Breakdown</div>
              <div className="text-xs text-gray-500 mt-1 mb-2">Estimated matches from our nutrition database</div>
              
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2">Ingredient</th>
                      <th className="text-right p-2">Calories</th>
                      <th className="text-right p-2">Protein</th>
                      <th className="text-right p-2">Carbs</th>
                      <th className="text-right p-2">Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(ingredientMatches).map(([ingredient, data], index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="p-2">
                          {ingredient}
                          {data.matched && (
                            <div className="text-xs text-gray-500">
                              Matched: {data.matched} ({data.quantity} × {data.unit})
                            </div>
                          )}
                          {!data.matched && (
                            <div className="text-xs text-gray-500">
                              No nutritional data available
                            </div>
                          )}
                        </td>
                        <td className="p-2 text-right">{Math.round(data.calories * data.quantity)}</td>
                        <td className="p-2 text-right">{Math.round(data.protein * data.quantity)}g</td>
                        <td className="p-2 text-right">{Math.round(data.carbs * data.quantity)}g</td>
                        <td className="p-2 text-right">{Math.round(data.fat * data.quantity)}g</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-2 bg-yellow-50 text-yellow-800 text-xs rounded">
                <strong>Disclaimer:</strong> This nutrition information is estimated based on a database of common ingredients. 
                For precise dietary information, please consult a nutritionist or use specialized nutrition software.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;
