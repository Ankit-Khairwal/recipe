import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaPlus, FaHome, FaUser, FaSignOutAlt, FaBookmark, FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close user menu if open
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary' : 'text-white';
  };

  return (
    <header className={`${scrolled ? 'bg-dark/95 backdrop-blur-md py-2 shadow-lg' : 'bg-dark py-4'} text-white sticky top-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold group">
            <FaUtensils className="text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="group-hover:text-primary transition-colors">Recipe Hub</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 items-center">
              <li>
                <Link to="/" className={`flex items-center gap-1.5 hover:text-primary transition-colors p-2 relative ${isActive('/')}`}>
                  <FaHome />
                  <span>Home</span>
                  {location.pathname === '/' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/add-recipe" className={`flex items-center gap-1.5 hover:text-primary transition-colors p-2 relative ${isActive('/add-recipe')}`}>
                      <FaPlus />
                      <span>Add Recipe</span>
                      {location.pathname === '/add-recipe' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/meal-planner" className={`flex items-center gap-1.5 hover:text-primary transition-colors p-2 relative ${isActive('/meal-planner')}`}>
                      <FaCalendarAlt />
                      <span>Meal Planner</span>
                      {location.pathname === '/meal-planner' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookmarks" className={`flex items-center gap-1.5 hover:text-primary transition-colors p-2 relative ${isActive('/bookmarks')}`}>
                      <FaBookmark />
                      <span>Bookmarks</span>
                      {location.pathname === '/bookmarks' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  </li>
                  <li className="relative ml-4">
                    <button 
                      onClick={toggleUserMenu}
                      className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full hover:bg-primary/30 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/40 flex items-center justify-center text-white">
                        {user?.name ? user.name[0].toUpperCase() : 'U'}
                      </div>
                      <span>{user?.name || 'User'}</span>
                    </button>
                    
                    {/* User dropdown menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white text-dark rounded-md shadow-xl overflow-hidden z-20 border border-gray-100 animate-fadeIn">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
                          <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                        </div>
                        <ul className="py-2">
                          <li>
                            <Link to="/meal-planner" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                              <FaCalendarAlt className="text-primary" />
                              <span>Meal Planner</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/bookmarks" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                              <FaBookmark className="text-primary" />
                              <span>My Bookmarks</span>
                            </Link>
                          </li>
                          <li className="border-t border-gray-100 mt-2">
                            <button 
                              onClick={handleLogout}
                              className="w-full text-left flex items-center gap-2 text-red-500 px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <FaSignOutAlt />
                              <span>Logout</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-all hover:shadow-md duration-300">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-md transition-all hover:shadow-primary/20 hover:shadow-md duration-300 ml-2">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark border-t border-gray-700 mt-3 py-4 animate-slideDown">
            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link 
                    to="/" 
                    className={`flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-colors ${location.pathname === '/' ? 'text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHome />
                    <span>Home</span>
                  </Link>
                </li>
                
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link 
                        to="/add-recipe" 
                        className={`flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-colors ${location.pathname === '/add-recipe' ? 'text-primary' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaPlus />
                        <span>Add Recipe</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/meal-planner" 
                        className={`flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-colors ${location.pathname === '/meal-planner' ? 'text-primary' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaCalendarAlt />
                        <span>Meal Planner</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/bookmarks" 
                        className={`flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-colors ${location.pathname === '/bookmarks' ? 'text-primary' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaBookmark />
                        <span>Bookmarks</span>
                      </Link>
                    </li>
                    <li className="border-t border-gray-700 mt-2 pt-2">
                      <div className="flex items-center gap-2 p-2 text-primary">
                        <div className="w-6 h-6 rounded-full bg-primary/40 flex items-center justify-center text-white">
                          {user?.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <span>{user?.name || 'User'}</span>
                      </div>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-2 text-red-400 hover:bg-gray-800 rounded transition-colors w-full text-left"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="border-t border-gray-700 mt-2 pt-2">
                      <Link 
                        to="/login" 
                        className="block text-center py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors mb-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/signup" 
                        className="block text-center py-2 bg-primary text-white hover:bg-primary/90 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
