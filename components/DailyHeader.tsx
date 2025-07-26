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
    <div className="text-center">
      <h1 className="text-2xl font-semibold flex items-center justify-center gap-2">
        <Icon className="w-6 h-6" />
        {title}
      </h1>
      <p className="text-gray-600">{formattedDate}</p>
    </div>
  );
}
