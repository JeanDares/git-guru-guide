
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GitBranch, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';
import { gitCategories } from '@/lib/gitCommands';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // Flatten all commands for search
  const allCommands = gitCategories.flatMap(category => 
    category.commands.map(command => ({
      ...command,
      categoryId: category.id,
      categoryTitle: category.title
    }))
  );

  // Filter commands based on search query
  const filteredCommands = allCommands.filter(command => 
    command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCommandSelect = (commandId: string, categoryId: string) => {
    setIsSearchOpen(false);
    navigate(`/commands?command=${commandId}&category=${categoryId}`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'neo-glass py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GitBranch className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">GitGuruGuide</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/commands" 
              className={`nav-link ${isActive('/commands') ? 'nav-link-active' : ''}`}
            >
              Comandos
            </Link>
            <Link 
              to="/chat" 
              className={`nav-link ${isActive('/chat') ? 'nav-link-active' : ''}`}
            >
              Chat Git
            </Link>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Pesquisar comandos"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              to="/chat" 
              className="px-4 py-2 bg-orange-500 text-white rounded-full transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              Pergunte ao GitGuru
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Pesquisar comandos"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              className="text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="glass md:hidden shadow-lg animate-fade-in">
          <nav className="flex flex-col py-4">
            <Link 
              to="/" 
              className={`px-4 py-3 hover:bg-background/50 transition-colors ${
                isActive('/') ? 'text-primary font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/commands" 
              className={`px-4 py-3 hover:bg-background/50 transition-colors ${
                isActive('/commands') ? 'text-primary font-medium' : ''
              }`}
            >
              Comandos
            </Link>
            <Link 
              to="/chat" 
              className={`px-4 py-3 hover:bg-background/50 transition-colors ${
                isActive('/chat') ? 'text-primary font-medium' : ''
              }`}
            >
              Chat Git
            </Link>
            <div className="px-4 py-3">
              <Link 
                to="/chat" 
                className="block w-full text-center px-4 py-2 bg-orange-500 text-white rounded-full transition-all duration-200 hover:shadow-md"
              >
                Pergunte ao GitGuru
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Search Command Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command>
          <CommandInput 
            placeholder="Pesquisar comandos Git..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>Nenhum comando encontrado.</CommandEmpty>
            {filteredCommands.length > 0 && (
              <CommandGroup heading="Comandos Git">
                {filteredCommands.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleCommandSelect(command.id, command.categoryId)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{command.title}</span>
                      <span className="text-xs text-muted-foreground">{command.categoryTitle}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
