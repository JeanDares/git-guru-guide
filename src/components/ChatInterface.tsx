import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '../components/ui/use-toast';
import { useChat, ChatMessage } from '@/hooks/useChat';
import TypingIndicator from '@/components/TypingIndicator';

const ChatInterface = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Rolagem automática para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Função para enviar mensagem
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');

    // Enviar mensagem e obter resposta
    await sendMessage(userInput);
  };

  // Função para limpar o chat
  const handleClearChat = () => {
    clearChat();
    toast({
      title: 'Chat reiniciado',
      description: 'O histórico de conversa foi limpo.'
    });
  };

  // Formatação de código inline em mensagens
  const formatMessage = (content: string) => {
    // Divida o conteúdo em linhas
    return content.split('\n').map((line, i) => {
      // Verifique se há blocos de código (formato ```code```)
      if (line.startsWith('```') && !line.endsWith('```')) {
        // Início de um bloco de código
        return (
          <div key={i} className="my-2">
            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded text-sm overflow-x-auto">
              {line.replace('```', '')}
            </pre>
          </div>
        );
      } else if (line.endsWith('```') && !line.startsWith('```')) {
        // Fim de um bloco de código
        return (
          <div key={i} className="my-2">
            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded text-sm overflow-x-auto">
              {line.replace('```', '')}
            </pre>
          </div>
        );
      } else if (line.startsWith('```') && line.endsWith('```')) {
        // Bloco de código de uma linha
        return (
          <div key={i} className="my-2">
            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded text-sm overflow-x-auto">
              {line.replace(/```/g, '')}
            </pre>
          </div>
        );
      } else if (line.includes('`')) {
        // Código inline
        const parts = line.split('`');
        return (
          <p key={i} className="my-1">
            {parts.map((part, j) => {
              // Se for índice ímpar, é código
              return j % 2 === 1 ? (
                <code key={j} className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">
                  {part}
                </code>
              ) : (
                <span key={j}>{part}</span>
              );
            })}
          </p>
        );
      } else {
        // Texto normal
        return <p key={i} className="my-1">{line}</p>;
      }
    });
  };

  return (
    <Card className="w-full shadow-md border">
      <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" /> Chat com GitGuru
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClearChat}
          title="Limpar conversa"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Área de mensagens */}
        <ScrollArea className="h-[500px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 rounded-lg p-4",
                  message.role === 'assistant'
                    ? "bg-secondary/30"
                    : "bg-primary/5 ml-auto max-w-[80%]"
                )}
              >
                {message.role === 'assistant' ? (
                  <div className="h-8 w-8 shrink-0 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <Bot size={18} />
                  </div>
                ) : (
                  <div className="h-8 w-8 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                    <User size={18} />
                  </div>
                )}
                <div className="flex-1">
                  <div className="prose prose-sm dark:prose-invert break-words">
                    {formatMessage(message.content)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Área de entrada */}
        <form onSubmit={handleSendMessage} className="flex items-center p-3 border-t">
          <Input
            type="text"
            placeholder="Digite sua pergunta sobre Git..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 mr-2"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={isLoading ? "opacity-70" : ""}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;