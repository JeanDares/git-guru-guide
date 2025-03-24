
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GitBranch } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
            <Link 
              to="/chat" 
              className="px-4 py-2 bg-primary text-white rounded-full transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              Pergunte ao GitGuru
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
                className="block w-full text-center px-4 py-2 bg-primary text-white rounded-full transition-all duration-200 hover:shadow-md"
              >
                Pergunte ao GitGuru
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
