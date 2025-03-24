
import React from 'react';
import { ChevronRight, GitBranch, GitMerge, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 opacity-5 text-primary">
          <GitBranch size={320} strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-5 text-primary">
          <GitMerge size={280} strokeWidth={0.5} />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="inline-flex items-center py-1 px-3 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <GitBranch className="h-4 w-4 mr-1" />
              Domine o Git
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
            Controle de versão simplificado
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            Guia completo com todos os comandos Git que você precisa para dominar o controle de versão e colaboração em seus projetos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link
              to="/commands"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Ver comandos
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/80 transition-all duration-200"
            >
              Pergunte ao GitGuru
              <Search className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="p-6 neo-glass rounded-xl">
              <h3 className="text-3xl md:text-4xl font-bold text-primary">10+</h3>
              <p className="text-sm text-muted-foreground mt-2">Categorias de comandos</p>
            </div>
            <div className="p-6 neo-glass rounded-xl">
              <h3 className="text-3xl md:text-4xl font-bold text-primary">40+</h3>
              <p className="text-sm text-muted-foreground mt-2">Comandos detalhados</p>
            </div>
            <div className="p-6 neo-glass rounded-xl">
              <h3 className="text-3xl md:text-4xl font-bold text-primary">100+</h3>
              <p className="text-sm text-muted-foreground mt-2">Exemplos práticos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
