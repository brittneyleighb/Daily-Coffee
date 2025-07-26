import { Coffee, Zap } from "lucide-react";

interface DailyHeaderProps {
  category?: 'brewing' | 'espresso';
}

export function DailyHeader({ category = 'brewing' }: DailyHeaderProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const isEspresso = category === 'espresso';
  const Icon = isEspresso ? Zap : Coffee;
  const title = isEspresso ? 'Daily Espresso Recipe' : 'Daily Coffee Recipe';

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon className="w-6 h-6 text-primary" />
        <h2 className="text-muted-foreground">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{formattedDate}</p>
    </div>
  );
}
