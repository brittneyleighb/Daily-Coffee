import { useState } from "react";
import { Card } from "./UI/Card";
import { Badge } from "./UI/Badge";
import { Button } from "./UI/Button";
import { Clock, Heart, Share2 } from "lucide-react";
import { CoffeeIcon } from "./Coffee-Icons";
import { CoffeeRecipe } from "../data/Coffee-Recipes";
import { projectId } from "../supabase-utils/info";

interface DailyRecipeCardProps {
  recipe: CoffeeRecipe;
  user?: any;
  accessToken?: string;
  onAuthRequired?: () => void;
}

export function DailyRecipeCard({ recipe, user, accessToken, onAuthRequired }: DailyRecipeCardProps) {
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      onAuthRequired?.();
      return;
    }

    setIsFavoriting(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-69bb737c/save-favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ recipe })
      });

      const result = await response.json();

      if (result.success) {
        setIsFavorited(true);
      } else {
        console.error('Failed to save favorite:', result.error);
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
    } finally {
      setIsFavoriting(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipe.name} - Coffee Recipe`,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      const shareText = `Check out this ${recipe.name} recipe: ${recipe.description}`;
      try {
        await navigator.clipboard.writeText(shareText);
        // You could show a toast notification here
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
    setIsSharing(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-muted-foreground">
            <CoffeeIcon type={recipe.icon} className="w-12 h-12" />
          </div>
          <div>
            <h1 className="mb-1 text-xl font-semibold">{recipe.name}</h1>
            <p className="text-muted-foreground text-sm">{recipe.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
      </div>

      {/* Recipe Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Brew time: {recipe.brewTime}</span>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            aria-label="Save this recipe"
            title="Save this recipe"
            variant="outline"
            size="sm"
            onClick={handleFavorite}
            disabled={isFavoriting}
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
            {isFavoriting ? 'Saving...' : isFavorited ? 'Saved' : 'Save'}
          </Button>

          <Button
            type="button"
            aria-label="Share this recipe"
            title="Share this recipe"
            variant="outline"
            size="sm"
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h3 className="mb-3 text-lg font-medium">Ingredients</h3>
        <ul className="space-y-2">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div>
        <h3 className="mb-3 text-lg font-medium">Instructions</h3>
        <ol className="space-y-3">
          {recipe.instructions?.map((instruction, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                {index + 1}
              </span>
              <span className="leading-relaxed">{instruction}</span>
            </li>
          ))}
        </ol>
      </div>

      {!user && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Sign in to save your favorite recipes and get personalized recommendations!
          </p>
        </div>
      )}
    </Card>
  );
}
