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

  // Helper function to enhance description based on preferences
  const enhanceDescriptionWithPreferences = (baseDescription: string, preferences: string): string => {
    const preferenceWords = preferences.toLowerCase().split(' ');
    let enhancement = '';
    
    if (preferenceWords.some(word => ['strong', 'bold', 'intense'].includes(word))) {
      enhancement = ' This bold preparation will deliver a rich, intense flavor profile.';
    } else if (preferenceWords.some(word => ['light', 'mild', 'gentle', 'fruity'].includes(word))) {
      enhancement = ' This lighter approach highlights delicate, nuanced flavors.';
    } else if (preferenceWords.some(word => ['sweet', 'smooth', 'creamy'].includes(word))) {
      enhancement = ' Prepared to emphasize sweetness and smooth texture.';
    } else {
      enhancement = ` Customized for your preference: ${preferences}.`;
    }
    
    return baseDescription + enhancement;
  };

  // Helper function to get appropriate tag based on preferences
  const getPreferenceTag = (preferences: string): string => {
    const preferenceWords = preferences.toLowerCase().split(' ');
    
    if (preferenceWords.some(word => ['strong', 'bold', 'intense'].includes(word))) {
      return 'bold';
    } else if (preferenceWords.some(word => ['light', 'mild', 'gentle', 'fruity'].includes(word))) {
      return 'light';
    } else if (preferenceWords.some(word => ['sweet', 'smooth', 'creamy'].includes(word))) {
      return 'smooth';
    }
    return 'custom';
  };

  const generateCustomRecipe = async () => {
    setIsGenerating(true);
    setError("");

    try {
      // Import base recipes
      const baseRecipes = await import('../data/Coffee-Recipes');
      const baseRecipe = baseRecipes.getRandomRecipe(category);

      if (!baseRecipe) {
        throw new Error('Failed to load base recipe');
      }

      const normalizedPreferences = preferences.trim().toLowerCase();
      
      // Temporarily skip API call due to CORS issue - fix function first
      console.log('Skipping API call due to CORS issue, using enhanced fallback');
      
      /*
      // Uncomment when CORS is fixed in your Supabase Edge Function
      try {
        const functionUrl = `https://jvjqfolccxfryxkepnbf.supabase.co/functions/v1/make-server-69bb737c`;
        
        console.log('Making request to:', functionUrl);
        console.log('Request payload:', { preferences: normalizedPreferences, category, baseRecipe });

        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken || publicAnonKey}`,
            // Add CORS headers just in case
            'Origin': window.location.origin
          },
          body: JSON.stringify({
            preferences: normalizedPreferences,
            category,
            baseRecipe
          })
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('Parsed response:', result);

        if (result && result.success && result.recipe) {
          onRecipeGenerated(result.recipe);
          setPreferences("");
          setShowPanel(false);
          return; // Success - exit early
        } else {
          console.warn('AI service returned invalid response, using fallback');
          if (result?.error) {
            console.error('API error:', result.error);
          }
        }
      } catch (apiError) {
        console.error('API call failed:', apiError);
        console.log('Falling back to enhanced custom recipe');
      }
      */
      
      // Fallback: Create an enhanced custom recipe based on preferences
      const customRecipe: CoffeeRecipe = {
        ...baseRecipe,
        id: `custom-${Date.now()}`,
        name: `Custom ${baseRecipe.name}`,
        description: enhanceDescriptionWithPreferences(baseRecipe.description, normalizedPreferences),
        tags: [...(baseRecipe.tags || []), 'custom', getPreferenceTag(normalizedPreferences)]
      };
      
      onRecipeGenerated(customRecipe);
      setPreferences("");
      setShowPanel(false);
    } catch (error) {
      console.error('Error generating custom recipe:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError('Network error: Unable to connect to the AI service. Please check your connection and try again.');
      } else if (error instanceof Error) {
        setError(`Failed to generate custom recipe: ${error.message}`);
      } else {
        setError('Failed to generate custom recipe. Please try again.');
      }
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
