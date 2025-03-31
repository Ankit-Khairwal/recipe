import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaPinterest, FaUtensils, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-dark to-dark/95 text-white pt-12 pb-6 mt-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaUtensils className="text-primary text-2xl" />
              <h2 className="text-2xl font-bold">Recipe Hub</h2>
            </div>
            <p className="text-gray-300 mb-4">Discover, create, and share amazing recipes from around the world. Join our community of food lovers today!</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Pinterest">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-700 pb-2">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Home</Link>
              </li>
              <li>
                <Link to="/meal-planner" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Meal Planner</Link>
              </li>
              <li>
                <Link to="/bookmarks" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">My Bookmarks</Link>
              </li>
              <li>
                <Link to="/add-recipe" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Add Recipe</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-700 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=breakfast" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Breakfast</Link>
              </li>
              <li>
                <Link to="/?category=main+course" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Main Course</Link>
              </li>
              <li>
                <Link to="/?category=dessert" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Desserts</Link>
              </li>
              <li>
                <Link to="/?category=beverage" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">Beverages</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors inline-block py-1">View All</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-700 pb-2">Subscribe</h3>
            <p className="text-gray-300 mb-4">Get the latest recipes and tips delivered to your inbox.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md border-0 focus:ring-2 focus:ring-primary w-full text-dark"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 rounded-r-md transition-colors">
                <FaEnvelope />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} Recipe Hub. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
            </div>
            
            <p className="flex items-center gap-1 text-sm text-gray-400 mt-4 md:mt-0">
              Made with <FaHeart className="text-primary text-xs" /> by Recipe Hub Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
