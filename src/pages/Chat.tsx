
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { GitBranch, MessageCircle } from 'lucide-react';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center py-1 px-3 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
              <MessageCircle className="h-4 w-4 mr-1" />
              Assistente Git
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">Chat com GitGuru</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Tire suas dúvidas sobre Git com nosso assistente inteligente. Pergunte sobre comandos, fluxos de trabalho ou conceitos.
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <ChatInterface />
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-center">Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  question: "Como crio uma nova branch?",
                  answer: "Você pode criar uma nova branch com o comando `git branch nome-da-branch` ou criar e mudar para ela diretamente com `git checkout -b nome-da-branch`."
                },
                {
                  question: "Como desfaço o último commit?",
                  answer: "Para desfazer o último commit mantendo as alterações, use `git reset --soft HEAD~1`. Se quiser descartar as alterações, use `git reset --hard HEAD~1`."
                },
                {
                  question: "Como resolvo conflitos em um merge?",
                  answer: "Quando ocorrem conflitos, edite os arquivos marcados, resolva os conflitos manualmente, adicione os arquivos com `git add` e finalize o merge com `git commit`."
                },
                {
                  question: "Como posso ver as diferenças antes de um commit?",
                  answer: "Use `git diff` para ver as diferenças entre o diretório de trabalho e o staging. Para ver as diferenças já em staging, use `git diff --staged`."
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-card rounded-xl shadow-sm border border-border">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <GitBranch className="h-5 w-5 text-primary mr-2" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
