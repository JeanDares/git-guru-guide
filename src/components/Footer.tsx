
import React from 'react';
import { GitBranch, Github, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/30 py-12 mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <GitBranch className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">GitGuruGuide</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Seu guia completo para comandos Git e controle de versão.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/commands" className="hover:text-primary transition-colors">Comandos Git</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-primary transition-colors">Chat Git</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://git-scm.com/doc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Documentação Oficial Git
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://about.gitlab.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitLab
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Social</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GitGuruGuide. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Feito com <Heart className="h-4 w-4 mx-1 text-destructive" /> usando React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
