import { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const BookmarkButton = ({ recipeId, recipeTitle }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // In a real app, we would check if this recipe is bookmarked
    // by retrieving user's bookmarks from backend/localStorage
    if (isAuthenticated) {
      // Simulate checking saved bookmarks from localStorage
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(savedBookmarks.some(bookmark => bookmark.id === recipeId));
    }
  }, [recipeId, isAuthenticated]);

  const toggleBookmark = () => {
    if (!isAuthenticated) {
      alert('Please log in to bookmark recipes');
      return;
    }

    // Toggle bookmark state
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    
    // Update localStorage (in a real app, this would sync with backend)
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (newBookmarkedState) {
      // Add bookmark
      const updatedBookmarks = [...savedBookmarks, { 
        id: recipeId, 
        title: recipeTitle,
        dateAdded: new Date().toISOString()
      }];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      
      // Show a toast or notification
      showToast(`${recipeTitle} added to your bookmarks!`);
    } else {
      // Remove bookmark
      const filteredBookmarks = savedBookmarks.filter(bookmark => bookmark.id !== recipeId);
      localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
      
      // Show a toast or notification
      showToast(`${recipeTitle} removed from your bookmarks.`);
    }
  };

  // Simple toast notification function
  const showToast = (message) => {
    // Check if toast container exists, if not create it
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed bottom-4 right-4 z-50';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'bg-dark text-white px-4 py-2 rounded-md shadow-lg mb-2 transform transition-transform duration-300 translate-y-0';
    toast.innerText = message;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => {
        if (toastContainer.contains(toast)) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
        isBookmarked 
          ? 'bg-primary/10 text-primary' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
};

export default BookmarkButton;
