
import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, GitMerge, GitCommit, ChevronRight, Cpu, Code, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo que você precisa para dominar o Git</h2>
              <p className="text-muted-foreground text-lg">
                Explore recursos detalhados e exemplos práticos para todos os comandos Git essenciais.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comandos Detalhados</h3>
                <p className="text-muted-foreground mb-4">
                  Cada comando Git explicado com sintaxe clara, exemplos práticos e dicas úteis para uso diário.
                </p>
                <Link to="/commands" className="text-primary font-medium flex items-center hover:underline">
                  Ver comandos <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Assistente IA</h3>
                <p className="text-muted-foreground mb-4">
                  Tire suas dúvidas sobre Git com nosso assistente de IA que responde perguntas em linguagem natural.
                </p>
                <Link to="/chat" className="text-primary font-medium flex items-center hover:underline">
                  Conversar agora <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fluxos de Trabalho</h3>
                <p className="text-muted-foreground mb-4">
                  Aprenda padrões e fluxos de trabalho Git para colaboração eficiente em equipe.
                </p>
                <Link to="/commands" className="text-primary font-medium flex items-center hover:underline">
                  Explorar fluxos <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Categorias de Comandos</h2>
              <p className="text-muted-foreground text-lg">
                O Git organizado em categorias lógicas para facilitar seu aprendizado.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {[
                { icon: GitBranch, title: "Configuração Inicial", description: "Configure o Git com suas informações pessoais." },
                { icon: GitMerge, title: "Inicialização e Clonagem", description: "Inicie repositórios ou clone existentes." },
                { icon: GitCommit, title: "Controle de Versão Básico", description: "Comandos essenciais do fluxo de trabalho Git." },
                { icon: GitBranch, title: "Branches", description: "Trabalhe com ramificações para desenvolvimento paralelo." },
                { icon: GitMerge, title: "Sincronização", description: "Mantenha seus repositórios locais e remotos sincronizados." },
                { icon: GitCommit, title: "Reversão e Reset", description: "Desfaça alterações quando necessário." },
              ].map((category, index) => (
                <Link 
                  key={index}
                  to="/commands"
                  className="p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <category.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link
                to="/commands"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Ver todas as categorias
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <GitBranch className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para dominar o Git?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Comece agora a explorar nosso guia completo de comandos ou pergunte diretamente ao nosso assistente de IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/commands"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Explorar comandos
                </Link>
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-primary-foreground rounded-full font-medium hover:bg-secondary/80 transition-all duration-200"
                >
                  Perguntar ao GitGuru
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
