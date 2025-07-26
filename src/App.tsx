import { useState, useEffect } from "react";
import { DailyHeader } from "../components/DailyHeader";
import { DailyRecipeCard } from "../components/DailyRecipeCard";
import { CategoryToggle } from "../components/CategoryToggle";
import { AICustomizer } from "../components/AICustomizer";
import { AuthModal } from "../components/AuthModal";
import { getTodaysRecipe, CoffeeRecipe, getRecipesByCategory } from "../data/Coffee-Recipes";
import { Button } from "../components/UI/Button";
import { Dice6, Calendar, User, LogOut, Heart } from "lucide-react";
import { supabase } from "../supabase-utils/client";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'brewing' | 'espresso'>('brewing');
  const [currentRecipe, setCurrentRecipe] = useState<CoffeeRecipe>(() => 
    getTodaysRecipe(activeCategory)
  );
  const [isCustomRecipe, setIsCustomRecipe] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [favorites, setFavorites] = useState<any[]>([]);

  // Check for existing session on app load
  useEffect(() => {
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setAccessToken(session.access_token);
          loadUserFavorites(session.access_token);
        } else {
          setUser(null);
          setAccessToken("");
          setFavorites([]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setAccessToken(session.access_token);
        loadUserFavorites(session.access_token);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const loadUserFavorites = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTION_URL}/make-server-69bb737c/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setFavorites(result.favorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleCategoryChange = (category: 'brewing' | 'espresso') => {
    setActiveCategory(category);
    setCurrentRecipe(getTodaysRecipe(category));
    setIsCustomRecipe(false);
  };

  const handleAIRecipeGenerated = (recipe: CoffeeRecipe) => {
    setCurrentRecipe(recipe);
    setIsCustomRecipe(true);
  };

  const handleBackToDaily = () => {
    setCurrentRecipe(getTodaysRecipe(activeCategory));
    setIsCustomRecipe(false);
  };

  const getRandomRecipe = () => {
    const recipes = getRecipesByCategory(activeCategory);
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setCurrentRecipe(recipes[randomIndex]);
    setIsCustomRecipe(true);
  };

  const handleAuthSuccess = (userData: any, token: string) => {
    setUser(userData);
    setAccessToken(token);
    loadUserFavorites(token);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAccessToken("");
      setFavorites([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        {/* User Account Section */}
        <div className="flex justify-end mb-4">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.user_metadata?.name || user.email}!
              </span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {favorites.length}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Button>
          )}
        </div>

        <DailyHeader category={activeCategory} />
        
        <CategoryToggle 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <AICustomizer 
          onRecipeGenerated={handleAIRecipeGenerated}
          category={activeCategory}
          user={user}
          accessToken={accessToken}
        />

        {isCustomRecipe && (
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToDaily}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Back to Daily
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={getRandomRecipe}
              className="flex items-center gap-2"
            >
              <Dice6 className="w-4 h-4" />
              Random Recipe
            </Button>
          </div>
        )}

        <DailyRecipeCard 
          recipe={currentRecipe} 
          user={user}
          accessToken={accessToken}
          onAuthRequired={() => setShowAuthModal(true)}
        />
        
        {/* Enhanced Footer */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-muted-foreground">
            {isCustomRecipe 
              ? `Custom ${activeCategory === 'brewing' ? 'brewing method' : 'espresso drink'} just for you`
              : `Today's ${activeCategory === 'brewing' ? 'brewing method' : 'espresso drink'}`
            }
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>• Discover new flavors daily</span>
            <span>• AI-powered customization</span>
            <span>• Save your favorites</span>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </div>
  );
}
