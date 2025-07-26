import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Sparkles, RefreshCw, User } from "lucide-react";
import { CoffeeRecipe } from "../data/coffeeRecipes";
import { projectId, publicAnonKey } from "../utils/supabase/info";

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
      const baseRecipes = await import('../data/coffeeRecipes');
      const baseRecipe = baseRecipes.getRandomRecipe(category);

      const normalizedPreferences = preferences.trim().toLowerCase();

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-69bb737c/generate-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || publicAnonKey}`
        },
        body: JSON.stri
