import { useState } from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaLink, FaCheck } from 'react-icons/fa';

const ShareRecipe = ({ recipeTitle, recipeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Create the share URL (in production this would be your actual site URL)
  const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
  
  // Prepare social media share links
  const sharers = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-[#1877F2]" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`Check out this recipe for ${recipeTitle}!`)}`
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-[#1DA1F2]" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this recipe for ${recipeTitle}!`)}`
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-[#25D366]" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this recipe for ${recipeTitle}! ${shareUrl}`)}`
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-gray-600" />,
      url: `mailto:?subject=${encodeURIComponent(`Recipe for ${recipeTitle}`)}&body=${encodeURIComponent(`I found this amazing recipe for ${recipeTitle}! Check it out: ${shareUrl}`)}`
    }
  ];

  const toggleShareMenu = () => {
    setIsOpen(!isOpen);
    // Reset copied state when closing
    if (isOpen) {
      setCopied(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleShareMenu}
        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
        aria-label="Share recipe"
      >
        <FaShareAlt />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 overflow-hidden transform origin-top-right transition-all duration-200 ease-out scale-100 opacity-100">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Share this recipe</h3>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {sharers.map((sharer) => (
                <a
                  key={sharer.name}
                  href={sharer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label={`Share on ${sharer.name}`}
                >
                  {sharer.icon}
                </a>
              ))}
            </div>
            
            <div className="flex items-center">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 text-sm p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={copyToClipboard}
                className={`p-2 border border-l-0 border-gray-300 rounded-r-md ${copied ? 'bg-green-50 text-green-600' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                {copied ? <FaCheck /> : <FaLink />}
              </button>
            </div>
            
            {copied && (
              <p className="text-xs text-green-600 mt-1 text-center">Link copied to clipboard!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareRecipe;
