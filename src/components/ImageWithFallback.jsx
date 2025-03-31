import { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, fallbackSrc }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Base64 encoded small placeholder image (light gray with a food icon)
  const defaultFallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PHBhdGggZD0iTTIwMCAxMjBjLTE2LjUgMC0zMCAxMy41LTMwIDMwIDAgMTYuNSAxMy41IDMwIDMwIDMwIDE2LjUgMCAzMC0xMy41IDMwLTMwIDAtMTYuNS0xMy41LTMwLTMwLTMwem0wIDVjMTMuOCAwIDI1IDExLjIgMjUgMjVzLTExLjIgMjUtMjUgMjUtMjUtMTEuMi0yNS0yNSAxMS4yLTI1IDI1LTI1eiIgZmlsbD0iIzljYTNhZiIvPjxwYXRoIGQ9Ik0yMTUgMTYwYzAgOC4zLTYuNyAxNS0xNSAxNXMtMTUtNi43LTE1LTE1IDYuNy0xNSAxNS0xNSAxNSA2LjcgMTUgMTV6IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';
  
  // Get text-based fallback based on alt text
  const getTextFallback = (text) => {
    if (!text) return defaultFallback;
    
    // Create a text-based placeholder with the recipe title
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="#9ca3af">${text}</text>
        <path d="M200 100c-16.5 0-30 13.5-30 30 0 16.5 13.5 30 30 30 16.5 0 30-13.5 30-30 0-16.5-13.5-30-30-30zm0 5c13.8 0 25 11.2 25 25s-11.2 25-25 25-25-11.2-25-25 11.2-25 25-25z" fill="#9ca3af"/>
        <path d="M215 140c0 8.3-6.7 15-15 15s-15-6.7-15-15 6.7-15 15-15 15 6.7 15 15z" fill="#9ca3af"/>
      </svg>`
    )}`;
  };
  
  const handleError = () => {
    if (!hasError) {
      // If fallbackSrc was provided but still fails, use our reliable text fallback
      setImgSrc(fallbackSrc && !fallbackSrc.includes('via.placeholder.com') ? fallbackSrc : getTextFallback(alt));
      setHasError(true);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
