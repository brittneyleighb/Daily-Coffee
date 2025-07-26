export interface CoffeeRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  brewTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
  category: 'brewing' | 'espresso';
  tags: string[];
}

export const coffeeRecipes: CoffeeRecipe[] = [
  // Brewing Methods
  {
    id: "1",
    name: "Classic Pour Over",
    description: "A clean, bright cup that highlights the coffee's natural flavors",
    ingredients: [
      "25g freshly ground coffee (medium grind)",
      "400ml hot water (200°F/93°C)",
      "Paper filter"
    ],
    instructions: [
      "Heat water to 200°F and rinse the filter",
      "Add coffee grounds and create a small well in the center",
      "Pour 50ml water in circular motion, let bloom for 30 seconds",
      "Continue pouring in slow, steady circles",
      "Total brew time: 3-4 minutes"
    ],
    brewTime: "4 minutes",
    difficulty: "Medium",
    icon: "pourover",
    category: "brewing",
    tags: ["clean", "bright", "filter"]
  },
  {
    id: "2",
    name: "French Press",
    description: "Rich, full-bodied coffee with deep, complex flavors",
    ingredients: [
      "30g coarsely ground coffee",
      "500ml hot water (200°F/93°C)"
    ],
    instructions: [
      "Add coffee grounds to French press",
      "Pour hot water over grounds, stir gently",
      "Place plunger on top, don't press yet",
      "Steep for 4 minutes",
      "Press plunger down slowly and serve"
    ],
    brewTime: "4 minutes",
    difficulty: "Easy",
    icon: "frenchpress",
    category: "brewing",
    tags: ["rich", "full-bodied", "immersion"]
  },
  // ... Remaining recipes with "id" fields as strings for uniqueness ...
];

// Function to get today's recipe
export function getTodaysRecipe(category?: 'brewing' | 'espresso'): CoffeeRecipe {
  const filteredRecipes = category ? coffeeRecipes.filter(recipe => recipe.category === category) : coffeeRecipes;
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const recipeIndex = dayOfYear % filteredRecipes.length;
  return filteredRecipes[recipeIndex];
}

// Function to get recipes by category
export function getRecipesByCategory(category: 'brewing' | 'espresso'): CoffeeRecipe[] {
  return coffeeRecipes.filter(recipe => recipe.category === category);
}

// Function to get random recipe for AI suggestions
export function getRandomRecipe(category?: 'brewing' | 'espresso'): CoffeeRecipe {
  const filteredRecipes = category ? coffeeRecipes.filter(recipe => recipe.category === category) : coffeeRecipes;
  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  return filteredRecipes[randomIndex];
}
