import { useState } from "react";
import { Card } from "./UI/Card";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";
import { Badge } from "./UI/Badge";
import { Sparkles, RefreshCw, User } from "lucide-react";
import { CoffeeRecipe } from "../data/Coffee-Recipes";
import { projectId, publicAnonKey } from "../supabase-utils/info";

interface AICustomizerProps {
  onRecipeGenerated: (recipe: CoffeeRecipe) => void;
  category: 'brewing' | 'espresso';
  user?: any;
  accessToken?: string;
}

export function AICustomizer({ onRecipeGenerated, category, user, accessToken }: AICustomizerProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState("");

  const generateCustomRecipe = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const baseRecipes = await import('../data/Coffee-Recipes');
      const baseRecipe = baseRecipes.getRandomRecipe(category);

      const normalizedPreferences = preferences.trim().toLowerCase();

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-69bb737c`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || publicAnonKey}`
        },
        body: JSON.stringify({
          preferences: normalizedPreferences,
          category,
          baseRecipe
        })
      });

      const result = await response.json();

      if (result.success && result.recipe) {
        onRecipeGenerated(result.recipe);
        setPreferences("");
        setShowPanel(false);
      } else {
        // Fallback to modified base recipe if AI generation fails
        const customRecipe: CoffeeRecipe = {
          ...baseRecipe,
          id: `custom-${Date.now()}`,
          name: `Custom ${baseRecipe.name}`,
          description: `${baseRecipe.description} - Customized for your preferences: ${preferences}`,
          tags: [...baseRecipe.tags, 'custom', 'ai-generated']
        };
        onRecipeGenerated(customRecipe);
        setPreferences("");
        setShowPanel(false);
      }
    } catch (error) {
      console.error('Error generating custom recipe:', error);
      setError('Failed to generate custom recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      {!showPanel ? (
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowPanel(true)}
            className="flex items-center gap-2 px-6 py-3"
          >
            <Sparkles className="w-5 h-5" />
            AI Custom Recipe
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Get a personalized {category === 'brewing' ? 'brewing method' : 'espresso drink'} recipe
          </p>
        </div>
      ) : (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Recipe Customizer</h3>
              {!user && (
                <Badge variant="secondary" className="ml-auto">
                  <User className="w-3 h-3 mr-1" />
                  Sign in for better results
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="preferences" className="text-sm font-medium">
                What are you in the mood for? (e.g., "strong and bold", "light and fruity", "something sweet")
              </label>
              <Input
                id="preferences"
                placeholder="Describe your perfect cup..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={generateCustomRecipe}
                disabled={isGenerating || !preferences.trim()}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Recipe'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPanel(false);
                  setPreferences("");
                  setError("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
