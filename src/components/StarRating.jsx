import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const StarRating = ({ initialRating = 0, recipeId, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const handleRating = (ratingValue) => {
    if (!isAuthenticated) {
      alert('Please log in to rate recipes');
      return;
    }
    
    setRating(ratingValue);
    
    if (onRatingChange) {
      onRatingChange(ratingValue, recipeId);
    }
    
    // In a real app, this would save to your backend
    // saveRating(ratingValue, recipeId, user.id)
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          
          return (
            <label key={index} className="cursor-pointer">
              <input 
                type="radio" 
                name="rating" 
                className="hidden" 
                value={ratingValue} 
                onClick={() => handleRating(ratingValue)}
              />
              <FaStar 
                size={22}
                className={`transition-colors duration-200 ${
                  ratingValue <= (hover || rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <span className="text-sm text-gray-600">
        {rating > 0 ? `Your rating: ${rating}/5` : 'Rate this recipe'}
      </span>
    </div>
  );
};

export default StarRating;
