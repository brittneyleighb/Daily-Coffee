import React, { useState } from 'react';

const CoffeeRecipe = () => {
  const [activeTab, setActiveTab] = useState('brewing');

  // Sample data - you can replace this with your actual recipe data
  const brewingRecipes = {
    title: 'French Press',
    description: 'Rich, full-bodied coffee with deep, complex flavors',
    difficulty: 'Easy',
    brewTime: '4 minutes',
    tags: ['#rich', '#full-bodied', '#immersion'],
    ingredients: [
      '30g coarsely ground coffee',
      '500ml hot water (200°F/93°C)'
    ],
    instructions: [
      'Add coffee grounds to French press',
      'Pour hot water over grounds, stir gently',
      'Place plunger on top, don\'t press yet',
      'Steep for 4 minutes',
      'Press plunger down slowly and serve'
    ]
  };

  const espressoRecipes = {
    title: 'Classic Espresso',
    description: 'Intense, concentrated coffee with rich crema',
    difficulty: 'Medium',
    brewTime: '30 seconds',
    tags: ['#intense', '#concentrated', '#crema'],
    ingredients: [
      '18g finely ground espresso beans',
      '36ml water (90-96°C)',
      'Espresso machine'
    ],
    instructions: [
      'Grind coffee beans to fine consistency',
      'Dose 18g into portafilter and level',
      'Tamp evenly with 30lbs pressure',
      'Lock portafilter into group head',
      'Extract for 25-30 seconds'
    ]
  };

  const currentRecipe = activeTab === 'brewing' ? brewingRecipes : espressoRecipes;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-2">
          <span className="text-lg">☆</span>
          <span className="text-muted-foreground">AI Custom Recipe</span>
        </div>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span>👤</span>
          <span>Sign In</span>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">☕</span>
            <span className="text-primary font-medium">Daily Coffee Recipe</span>
          </div>
          <p className="text-muted-foreground text-sm">Saturday, July 26, 2025</p>
        </div>

        {/* Navigation Tags */}
        <div className="flex justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveTab('brewing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'brewing' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            ⚡ Brewing Methods
          </button>
          <button 
            onClick={() => setActiveTab('espresso')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'espresso' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            ⚡ Espresso Drinks
          </button>
        </div>

        {/* Recipe Card */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
          {/* Recipe Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                <span className="text-muted-foreground">📄</span>
              </div>
              <div>
                <h1 className="text-2xl font-medium text-foreground mb-1">{currentRecipe.title}</h1>
                <p className="text-muted-foreground text-sm">{currentRecipe.description}</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {currentRecipe.difficulty}
            </span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {currentRecipe.tags.map((tag, index) => (
              <span key={index} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Brew Time */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-muted-foreground">⏰</span>
            <span className="text-muted-foreground text-sm">Brew time: {currentRecipe.brewTime}</span>
          </div>

          {/* Save and Share buttons */}
          <div className="flex gap-3 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
              <span>🤍</span>
              <span className="text-sm font-medium">Save</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
              <span>📤</span>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-foreground mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                  <span className="text-foreground">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Instructions</h2>
            <ol className="space-y-3">
              {currentRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sign in CTA */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm mb-4">
            Sign in to save your favorite recipes and get personalized recommendations!
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p className="mb-2">Today's brewing method • AI-powered customization • Save your favorites</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeRecipe;
