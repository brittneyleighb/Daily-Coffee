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
  // Brewing Recipes
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
  {
    id: "3",
    name: "AeroPress",
    description: "A quick and smooth brew with low acidity and rich flavor.",
    ingredients: [
      "17g finely ground coffee",
      "250ml hot water (175°F/80°C)",
      "Paper or metal filter"
    ],
    instructions: [
      "Insert filter into cap and rinse with hot water",
      "Add ground coffee to AeroPress",
      "Pour in hot water up to the top and stir for 10 seconds",
      "Attach plunger and press gently over 30 seconds",
      "Enjoy immediately"
    ],
    brewTime: "2–3 minutes",
    difficulty: "Medium",
    icon: "aeropress",
    category: "brewing",
    tags: ["smooth", "fast", "portable"]
  },
  {
    id: "4",
    name: "Cold Brew",
    description: "A refreshing and mellow cold coffee, steeped overnight.",
    ingredients: [
      "100g coarsely ground coffee",
      "1L cold filtered water",
      "Jar or French press"
    ],
    instructions: [
      "Add coffee and water to container",
      "Stir to ensure all grounds are wet",
      "Cover and let steep for 12–18 hours in the fridge",
      "Strain through filter or French press",
      "Serve over ice or dilute to taste"
    ],
    brewTime: "12 hours (steeping)",
    difficulty: "Easy",
    icon: "coldbrew",
    category: "brewing",
    tags: ["cold", "smooth", "low-acid"]
  },

  // Espresso Recipes
  {
    id: "5",
    name: "Rose Latte",
    description: "A delicate floral latte infused with rose syrup.",
    ingredients: [
      "1 shot espresso (30ml)",
      "200ml steamed milk",
      "1 tbsp rose syrup",
      "Dried rose petals (optional)"
    ],
    instructions: [
      "Brew a shot of espresso",
      "Add rose syrup to the espresso and stir",
      "Steam milk until velvety and pour over espresso",
      "Top with dried rose petals if desired"
    ],
    brewTime: "5 minutes",
    difficulty: "Easy",
    icon: "latte",
    category: "espresso",
    tags: ["floral", "sweet", "latte"]
  },
  {
    id: "6",
    name: "Lavender Latte",
    description: "A soothing blend of espresso and lavender syrup.",
    ingredients: [
      "1 shot espresso (30ml)",
      "200ml steamed milk",
      "1 tbsp lavender syrup",
      "Lavender buds (optional)"
    ],
    instructions: [
      "Brew a shot of espresso",
      "Stir in lavender syrup",
      "Steam milk and pour into the espresso",
      "Garnish with a pinch of lavender buds if desired"
    ],
    brewTime: "5 minutes",
    difficulty: "Easy",
    icon: "latte",
    category: "espresso",
    tags: ["herbal", "calming", "latte"]
  },
  {
    id: "7",
    name: "Earl Grey Latte",
    description: "A fragrant blend of Earl Grey tea, milk, and espresso.",
    ingredients: [
      "1 shot espresso (optional)",
      "1 Earl Grey tea bag",
      "200ml steamed milk",
      "1 tbsp vanilla syrup"
    ],
    instructions: [
      "Steep the Earl Grey tea bag in 100ml hot water for 3–5 minutes",
      "Brew a shot of espresso if using",
      "Stir in vanilla syrup",
      "Steam and froth milk, then pour over the tea (and espresso)",
      "Stir and enjoy"
    ],
    brewTime: "7 minutes",
    difficulty: "Easy",
    icon: "latte",
    category: "espresso",
    tags: ["tea", "aromatic", "vanilla", "latte"]
  },
  {
    id: "8",
    name: "Cortado",
    description: "A balanced drink of espresso and steamed milk in equal parts.",
    ingredients: [
      "1 shot espresso (30ml)",
      "30ml steamed milk"
    ],
    instructions: [
      "Brew a shot of espresso",
      "Steam milk lightly (less foam than a latte)",
      "Pour steamed milk gently over espresso"
    ],
    brewTime: "3 minutes",
    difficulty: "Easy",
    icon: "cortado",
    category: "espresso",
    tags: ["balanced", "short", "smooth"]
  },
  {
    id: "9",
    name: "Cappuccino",
    description: "A classic espresso drink with equal parts espresso, steamed milk, and foam.",
    ingredients: [
      "1 shot espresso (30ml)",
      "60ml steamed milk",
      "60ml milk foam"
    ],
    instructions: [
      "Brew a shot of espresso",
      "Steam milk to create both liquid and foamed milk",
      "Pour steamed milk into espresso",
      "Top with thick foam"
    ],
    brewTime: "5 minutes",
    difficulty: "Medium",
    icon: "cappuccino",
    category: "espresso",
    tags: ["classic", "frothy", "creamy"]
  }
];


// === Utility Functions ===

export function getTodaysRecipe(category?: 'brewing' | 'espresso'): CoffeeRecipe {
  const filteredRecipes = category
    ? coffeeRecipes.filter(recipe => recipe.category === category)
    : coffeeRecipes;

  if (filteredRecipes.length === 0) {
    throw new Error(`No recipes found for category: ${category}`);
  }

  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  return filteredRecipes[randomIndex];
}

export function getRecipesByCategory(category: 'brewing' | 'espresso'): CoffeeRecipe[] {
  return coffeeRecipes.filter(recipe => recipe.category === category);
}

export function getRandomRecipe(category?: 'brewing' | 'espresso'): CoffeeRecipe {
  const filteredRecipes = category
    ? coffeeRecipes.filter(recipe => recipe.category === category)
    : coffeeRecipes;

  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  return filteredRecipes[randomIndex];
}
