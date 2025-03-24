
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GitCategory } from '@/lib/gitCommands';
import CommandItem from './CommandItem';

interface CommandCategoryProps {
  category: GitCategory;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const CommandCategory: React.FC<CommandCategoryProps> = ({ 
  category, 
  isExpanded = false, 
  onToggle 
}) => {
  return (
    <div className="mb-10 animate-fade-in">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 neo-glass rounded-xl hover:shadow-md transition-all duration-200"
      >
        <div className="text-left">
          <h2 className="text-xl md:text-2xl font-bold">{category.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
        </div>
        <div className="ml-4 text-muted-foreground">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="mt-6 space-y-6 pl-2 animate-slide-down">
          {category.commands.map((command) => (
            <CommandItem key={command.id} command={command} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandCategory;
