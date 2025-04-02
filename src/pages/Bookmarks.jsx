import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
   
    setLoading(true);
    if (isAuthenticated) {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarks(savedBookmarks);
    }
    setLoading(false);
  }, [isAuthenticated]);

  const removeBookmark = (id) => {
   
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    
  
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <div className="mb-6 text-primary">
          <FaBookmark size={60} className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to view your bookmarks</h1>
        <p className="text-gray-600 mb-6">Please log in to see your saved recipes.</p>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
          <FaArrowLeft />
          <span>Back to recipes</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        <FaBookmark className="inline-block mr-2 mb-1" />
        My Bookmarked Recipes
      </h1>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {bookmarks.map(bookmark => (
            <div key={bookmark.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/recipe/${bookmark.id}`} className="flex-1">
                <h3 className="text-xl font-medium text-primary hover:underline">{bookmark.title}</h3>
                <p className="text-sm text-gray-500">
                  Saved on {new Date(bookmark.dateAdded).toLocaleDateString()}
                </p>
              </Link>
              <button 
                onClick={() => removeBookmark(bookmark.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                aria-label="Remove bookmark"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            <FaBookmark size={50} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-gray-600 mb-6">Start exploring recipes and bookmark your favorites!</p>
          <Link to="/" className="btn btn-primary">
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
