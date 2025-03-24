
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Olá! Sou o GitGuru, seu assistente para dúvidas sobre Git. Como posso ajudar hoje?'
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Here you would normally make an API call to OpenAI
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getSimulatedResponse(input.trim())
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching response:', error);
      setIsLoading(false);
    }
  };

  // Function to simulate responses for demo purposes
  const getSimulatedResponse = (question: string): string => {
    const lowerCaseQuestion = question.toLowerCase();
    
    if (lowerCaseQuestion.includes('init')) {
      return 'O comando `git init` inicializa um novo repositório Git no diretório atual. Ele cria um subdiretório oculto .git que contém todos os arquivos necessários para o repositório Git. Exemplo: `git init`';
    }
    
    if (lowerCaseQuestion.includes('clone')) {
      return 'O comando `git clone` cria uma cópia de um repositório existente. O clone inclui todos os arquivos, histórico e branches do projeto. Exemplo: `git clone https://github.com/usuario/repositorio.git`';
    }
    
    if (lowerCaseQuestion.includes('commit')) {
      return 'O comando `git commit` salva suas alterações no repositório local. É como tirar uma "foto" do seu projeto naquele momento. Use sempre mensagens descritivas. Exemplo: `git commit -m "Adiciona função de login"`';
    }
    
    if (lowerCaseQuestion.includes('push')) {
      return 'O comando `git push` envia suas alterações locais para o repositório remoto. Isso permite que outros colaboradores vejam suas mudanças. Exemplo: `git push origin main`';
    }
    
    return 'Desculpe, não consegui entender completamente sua pergunta sobre Git. Poderia reformular ou ser mais específico? Estou aqui para ajudar com qualquer comando ou conceito do Git que você precise entender.';
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] neo-glass rounded-xl overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-secondary rounded-bl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 mr-2" />
                  ) : (
                    <User className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'assistant' ? 'GitGuru' : 'Você'}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg rounded-bl-none px-4 py-3">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  <span className="text-xs font-medium">GitGuru</span>
                </div>
                <div className="flex items-center mt-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm">Pensando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input form */}
      <div className="border-t border-border p-4 bg-background/50">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta sobre Git..."
            className="flex-1 py-2 px-4 bg-secondary rounded-l-full focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-r-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary-foreground disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          As respostas são simuladas para demonstração. Em produção, conecte à API da OpenAI.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
