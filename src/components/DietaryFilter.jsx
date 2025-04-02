import { useState } from 'react';
import { FaFilter, FaCheck, FaTimes } from 'react-icons/fa';

const DietaryFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    diets: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      keto: false,
      paleo: false,
      lowCarb: false,
      highProtein: false,
    },
    allergens: {
      nuts: false,
      eggs: false,
      soy: false,
      shellfish: false,
      gluten: false,
      dairy: false,
    },
    nutritionRange: {
      calories: { min: 0, max: 2000 },
      protein: { min: 0, max: 100 },
      carbs: { min: 0, max: 200 },
      fat: { min: 0, max: 100 },
    },
    cookingTime: {
      quick: false, 
      medium: false, 
      long: false, 
    }
  });

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleDietChange = (diet) => {
    setFilters({
      ...filters,
      diets: {
        ...filters.diets,
        [diet]: !filters.diets[diet]
      }
    });
  };

  const handleAllergenChange = (allergen) => {
    setFilters({
      ...filters,
      allergens: {
        ...filters.allergens,
        [allergen]: !filters.allergens[allergen]
      }
    });
  };

  const handleTimeChange = (time) => {
    setFilters({
      ...filters,
      cookingTime: {
        ...filters.cookingTime,
        [time]: !filters.cookingTime[time]
      }
    });
  };

  const handleRangeChange = (nutrient, type, value) => {
    setFilters({
      ...filters,
      nutritionRange: {
        ...filters.nutritionRange,
        [nutrient]: {
          ...filters.nutritionRange[nutrient],
          [type]: value
        }
      }
    });
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
    setIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      diets: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        keto: false,
        paleo: false,
        lowCarb: false,
        highProtein: false,
      },
      allergens: {
        nuts: false,
        eggs: false,
        soy: false,
        shellfish: false,
        gluten: false,
        dairy: false,
      },
      nutritionRange: {
        calories: { min: 0, max: 2000 },
        protein: { min: 0, max: 100 },
        carbs: { min: 0, max: 200 },
        fat: { min: 0, max: 100 },
      },
      cookingTime: {
        quick: false,
        medium: false,
        long: false,
      }
    });
  };

  
  const getActiveFilterCount = () => {
    let count = 0;
    
    
    Object.values(filters.diets).forEach(value => {
      if (value) count++;
    });
    
    
    Object.values(filters.allergens).forEach(value => {
      if (value) count++;
    });
    
    
    Object.values(filters.cookingTime).forEach(value => {
      if (value) count++;
    });
    
  
    if (filters.nutritionRange.calories.min > 0) count++;
    if (filters.nutritionRange.calories.max < 2000) count++;
    if (filters.nutritionRange.protein.min > 0) count++;
    if (filters.nutritionRange.protein.max < 100) count++;
    if (filters.nutritionRange.carbs.min > 0) count++;
    if (filters.nutritionRange.carbs.max < 200) count++;
    if (filters.nutritionRange.fat.min > 0) count++;
    if (filters.nutritionRange.fat.max < 100) count++;
    
    return count;
  };

  return (
    <div className="relative">
      <button
        onClick={toggleFilter}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        <FaFilter />
        <span>Dietary Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-20 top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl border">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Advanced Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Diet Preferences */}
            <div className="p-4 border-b">
              <h4 className="font-medium mb-2">Diet Preferences</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(filters.diets).map((diet) => (
                  <label 
                    key={diet}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.diets[diet]}
                      onChange={() => handleDietChange(diet)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      filters.diets[diet] ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {filters.diets[diet] && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="capitalize">{diet.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  </label>
                ))}
              </div>
            </div>

           
            <div className="p-4 border-b">
              <h4 className="font-medium mb-2">Exclude Allergens</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(filters.allergens).map((allergen) => (
                  <label 
                    key={allergen}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.allergens[allergen]}
                      onChange={() => handleAllergenChange(allergen)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      filters.allergens[allergen] ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {filters.allergens[allergen] && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="capitalize">{allergen}</span>
                  </label>
                ))}
              </div>
            </div>

            
            <div className="p-4 border-b">
              <h4 className="font-medium mb-2">Cooking Time</h4>
              <div className="flex gap-2">
                <label 
                  className={`flex-1 p-2 rounded text-center cursor-pointer ${
                    filters.cookingTime.quick ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.cookingTime.quick}
                    onChange={() => handleTimeChange('quick')}
                    className="hidden"
                  />
                  <span>Quick</span>
                  <div className="text-xs">Under 30m</div>
                </label>
                <label 
                  className={`flex-1 p-2 rounded text-center cursor-pointer ${
                    filters.cookingTime.medium ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.cookingTime.medium}
                    onChange={() => handleTimeChange('medium')}
                    className="hidden"
                  />
                  <span>Medium</span>
                  <div className="text-xs">30-60m</div>
                </label>
                <label 
                  className={`flex-1 p-2 rounded text-center cursor-pointer ${
                    filters.cookingTime.long ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.cookingTime.long}
                    onChange={() => handleTimeChange('long')}
                    className="hidden"
                  />
                  <span>Long</span>
                  <div className="text-xs">60m+</div>
                </label>
              </div>
            </div>

           
            <div className="p-4">
              <h4 className="font-medium mb-2">Nutrition Ranges</h4>
              
              {Object.keys(filters.nutritionRange).map((nutrient) => (
                <div key={nutrient} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="capitalize text-sm">{nutrient}</label>
                    <div className="text-sm text-gray-500">
                      {filters.nutritionRange[nutrient].min} - {filters.nutritionRange[nutrient].max}
                      {nutrient === 'calories' ? ' kcal' : 'g'}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <input
                      type="range"
                      min={0}
                      max={nutrient === 'calories' ? 2000 : nutrient === 'carbs' ? 200 : 100}
                      value={filters.nutritionRange[nutrient].min}
                      onChange={(e) => handleRangeChange(nutrient, 'min', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min={0}
                      max={nutrient === 'calories' ? 2000 : nutrient === 'carbs' ? 200 : 100}
                      value={filters.nutritionRange[nutrient].max}
                      onChange={(e) => handleRangeChange(nutrient, 'max', parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t flex justify-between">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietaryFilter;
