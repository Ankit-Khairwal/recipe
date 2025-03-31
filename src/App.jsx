import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Bookmarks from './pages/Bookmarks'
import MealPlanner from './pages/MealPlanner'
import NotFound from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import BackgroundPattern from './components/BackgroundPattern'
import ScrollToTop from './components/ScrollToTop'

// Configure future flags for React Router
const routerOptions = {
  future: {
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <AuthProvider>
      <Router {...routerOptions}>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-light">
          <BackgroundPattern />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/add-recipe" element={
                <PrivateRoute>
                  <AddRecipe />
                </PrivateRoute>
              } />
              <Route path="/edit-recipe/:id" element={
                <PrivateRoute>
                  <EditRecipe />
                </PrivateRoute>
              } />
              <Route path="/bookmarks" element={
                <PrivateRoute>
                  <Bookmarks />
                </PrivateRoute>
              } />
              <Route path="/meal-planner" element={
                <PrivateRoute>
                  <MealPlanner />
                </PrivateRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
