import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSadTear } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FaSadTear className="text-6xl text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center gap-2"
      >
        <FaHome />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
