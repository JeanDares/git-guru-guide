
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandCategory from '@/components/CommandCategory';
import { gitCategories } from '@/lib/gitCommands';

const Commands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter categories and commands based on search term
  const filteredCategories = gitCategories.map(category => {
    // Filter commands within this category
    const filteredCommands = category.commands.filter(command => 
      command.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.examples.some(ex => ex.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Return a new category object with filtered commands
    return {
      ...category,
      commands: filteredCommands
    };
  }).filter(category => category.commands.length > 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">Comandos Git</h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Explore nossa lista completa de comandos Git organizados por categoria.
            </p>
            
            {/* Search input */}
            <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar comandos Git..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-border bg-background rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CommandCategory key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nenhum comando encontrado para "{searchTerm}". Tente um termo diferente.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Commands;
