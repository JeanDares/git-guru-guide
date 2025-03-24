
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { GitCommand } from '@/lib/gitCommands';

interface CommandItemProps {
  command: GitCommand;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="border border-border bg-card rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/20 transition-colors duration-150"
      >
        <h3 className="text-lg font-semibold">{command.title}</h3>
        <div className="ml-4 text-muted-foreground">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 pt-0 animate-fade-in border-t border-border">
          <p className="text-muted-foreground mb-4">{command.description}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Sintaxe:</h4>
            <div className="code-block">
              <code>{command.syntax}</code>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Exemplos:</h4>
            <div className="space-y-3">
              {command.examples.map((example, index) => (
                <div key={index} className="code-block relative">
                  <code>{example.code}</code>
                  <button 
                    className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(example.code, index);
                    }}
                    aria-label="Copiar comando"
                  >
                    {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <p className="mt-2 text-sm text-muted-foreground">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {command.tips && (
            <div>
              <h4 className="text-sm font-medium mb-2">Dicas:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {command.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommandItem;
