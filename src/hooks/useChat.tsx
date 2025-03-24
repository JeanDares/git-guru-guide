import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/ui/use-toast';

// Tipos para as mensagens e respostas
export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    timestamp: Date;
}

interface OpenAIResponse {
    id: string;
    choices: {
        message: {
            content: string;
            role: string;
        };
    }[];
}

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Inicializa o chat com uma mensagem de boas-vindas
    useEffect(() => {
        const welcomeMessage: ChatMessage = {
            id: 'welcome',
            content: 'Olá! Sou o GitGuru, seu assistente especializado em Git. Como posso ajudar você hoje?',
            role: 'assistant',
            timestamp: new Date()
        };
        setMessages([welcomeMessage]);
    }, []);

    // Função para gerar ID único
    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };

    // Função para enviar mensagem para a API
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        // Adiciona a mensagem do usuário
        const userMessage: ChatMessage = {
            id: generateId(),
            content: content.trim(),
            role: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Verifica se a chave API está definida
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

            if (!apiKey) {
                throw new Error('API key não encontrada. Configure a variável de ambiente VITE_OPENROUTER_API_KEY.');
            }

            // Prepara as mensagens para enviar para a API
            const messagesToSend = [
                {
                    role: 'system' as const,
                    content: 'Você é o GitGuru, um assistente especializado em Git. Forneça respostas precisas e úteis sobre comandos Git, fluxos de trabalho e melhores práticas. Suas respostas devem ser claras, concisas e com exemplos práticos quando relevante.'
                },
                ...messages
                    .filter(msg => msg.id !== 'welcome') // Remove a mensagem de boas-vindas para não confundir o modelo
                    .map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                {
                    role: 'user' as const,
                    content: content.trim()
                }
            ];

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5173/', // ou seu domínio real
                    'X-Title': 'GitGuru AI Chat'
                },
                body: JSON.stringify({
                    model: 'mistralai/mistral-7b-instruct',
                    messages: messagesToSend,
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });



            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(`Erro na API: ${response.status} - ${errorData?.error?.message || 'Erro desconhecido'}`);
            }

            const data = await response.json();

            const assistantMessage: ChatMessage = {
                id: generateId(),
                content: data.choices[0].message?.content?.trim() || data.choices[0].text?.trim() || 'Sem resposta.',
                role: 'assistant',
                timestamp: new Date()
            };


            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Erro ao chamar a API da OpenAI:', error);

            toast({
                title: 'Erro na comunicação',
                description: error instanceof Error ? error.message : 'Não foi possível obter resposta do assistente.',
                variant: 'destructive'
            });

            // Adiciona mensagem de erro
            const errorMessage: ChatMessage = {
                id: generateId(),
                content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente mais tarde. Router IA.',
                role: 'assistant',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, toast]);

    // Função para limpar o histórico de chat
    const clearChat = useCallback(() => {
        const welcomeMessage: ChatMessage = {
            id: 'welcome',
            content: 'Olá! Sou o GitGuru, seu assistente especializado em Git. Como posso ajudar você hoje?',
            role: 'assistant',
            timestamp: new Date()
        };
        setMessages([welcomeMessage]);
    }, []);

    return {
        messages,
        isLoading,
        sendMessage,
        clearChat
    };
}