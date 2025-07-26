import React from "react";
import { Button } from "./UI/Button";
import { Coffee, Zap } from "lucide-react";

// Shared type (can be moved to a types.ts file if reused elsewhere)
export type Category = 'brewing' | 'espresso';

interface CategoryToggleProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryToggleComponent = ({ activeCategory, onCategoryChange }: CategoryToggleProps) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-muted rounded-lg p-1">
        <Button
          variant={activeCategory === 'brewing' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange('brewing')}
          className="flex items-center gap-2 rounded-md"
          aria-pressed={activeCategory === 'brewing'}
        >
          <Coffee className="w-4 h-4" />
          Brewing Methods
        </Button>

        <Button
          variant={activeCategory === 'espresso' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange('espresso')}
          className="flex items-center gap-2 rounded-md"
          aria-pressed={activeCategory === 'espresso'}
        >
          <Zap className="w-4 h-4" />
          Espresso Drinks
        </Button>
      </div>
    </div>
  );
};

export const CategoryToggle = React.memo(CategoryToggleComponent);
