import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChatMessage, TutorResponse, getChatCompletion } from '../api/openai';

type ChatContextType = {
  messages: ChatMessage[];
  loading: boolean;
  lastResponse: TutorResponse | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
};

const defaultContext: ChatContextType = {
  messages: [],
  loading: false,
  lastResponse: null,
  sendMessage: async () => {},
  clearMessages: () => {},
};

const ChatContext = createContext<ChatContextType>(defaultContext);

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<TutorResponse | null>(null);

  const sendMessage = async (content: string) => {
    try {
      setLoading(true);
      
      // Add user message
      const userMessage: ChatMessage = { role: 'user', content };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Get response from OpenAI
      const systemPrompt = `You are a knowledgeable tutor specializing in Monte Carlo algorithms for data analytics. 
        You provide clear, concise explanations with examples. You should adapt your responses to be practical
        and applicable to real-world scenarios. Always structure your responses according to the schema.
        For code examples, use Python or JavaScript. Keep explanations focused on a 1-day intensive course level.`;
      
      const response = await getChatCompletion(updatedMessages, systemPrompt);
      
      // Add assistant message
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: typeof response.content === 'string' 
          ? response.content 
          : JSON.stringify(response.content) 
      };
      
      setMessages([...updatedMessages, assistantMessage]);
      setLastResponse(response);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setLastResponse(null);
  };

  return (
    <ChatContext.Provider value={{ messages, loading, lastResponse, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
