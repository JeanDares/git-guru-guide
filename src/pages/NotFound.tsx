
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GitBranch, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-32 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md animate-fade-in">
          <GitBranch className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Parece que este repositório não existe. A branch que você procura pode ter sido excluída ou movida.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            Voltar para Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
