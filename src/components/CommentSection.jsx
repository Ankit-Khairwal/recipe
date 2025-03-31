import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaClock } from 'react-icons/fa';

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // In a real app, this would come from your backend
  useEffect(() => {
    // Simulating loading comments
    setLoading(true);
    
    // Mock data for demo
    const mockComments = [
      {
        id: '1',
        userId: 'user1',
        userName: 'CookingEnthusiast',
        text: 'I made this recipe last night and it was amazing! I added some red pepper flakes for a bit of heat.',
        date: '2025-03-30T18:24:00',
        recipeId: recipeId
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'FoodieChef',
        text: 'Great recipe! I substituted the milk with almond milk and it turned out perfect.',
        date: '2025-03-29T14:35:00',
        recipeId: recipeId
      }
    ];
    
    setTimeout(() => {
      setComments(mockComments);
      setLoading(false);
    }, 500);
  }, [recipeId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please log in to comment');
      return;
    }
    
    if (!newComment.trim()) return;
    
    // In a real app, you would save the comment to your backend
    // and get a real ID back
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      userId: user ? user.id : 'guest',
      userName: user ? user.name : 'Guest User',
      text: newComment,
      date: new Date().toISOString(),
      recipeId
    };
    
    setComments(prevComments => [newCommentObj, ...prevComments]);
    setNewComment('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts or tips about this recipe..."
            className="input w-full h-32 p-3"
            required
          />
          <button
            type="submit"
            className="btn btn-primary mt-3"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md mb-8 text-center">
          <p>Please <a href="/login" className="text-primary hover:underline">log in</a> to leave a comment.</p>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded-full p-2">
                    <FaUser className="text-gray-500" />
                  </div>
                  <span className="font-medium">{comment.userName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-1" />
                  <span>{formatDate(comment.date)}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
