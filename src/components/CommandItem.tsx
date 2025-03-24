
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Lightbulb } from 'lucide-react';
import { GitCommand } from '@/lib/gitCommands';

interface CommandItemProps {
  command: GitCommand;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      id={`command-${command.id}`} 
      className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer p-4 bg-card"
      >
        <div className="flex items-center">
          <Code className="h-5 w-5 text-primary mr-3" />
          <div>
            <h3 className="font-medium">{command.title}</h3>
            <p className="text-sm text-muted-foreground">{command.description}</p>
          </div>
        </div>
        <div className="ml-4 text-muted-foreground">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-border animate-fade-in">
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Sintaxe:</h4>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              <code>{command.syntax}</code>
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Exemplos:</h4>
            <div className="space-y-2">
              {command.examples.map((example, index) => (
                <div key={index} className="rounded-md">
                  <pre className="bg-muted p-3 rounded-t-md text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                  <p className="text-xs p-2 bg-secondary/30 rounded-b-md">
                    {example.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {command.tips && command.tips.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
                Dicas:
              </h4>
              <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
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
