import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatBox";
import ChatInput from "./ChatInput";
import { getChatResponse } from "../services/openAIservices";

// Define the Message interface properly
interface Message {
  text: string;
  sender: "user" | "bot";
}

// Define the OpenAI message format interface
interface OpenAIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you?", sender: "bot" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message to the chat
    const updatedMessages: Message[] = [...messages, { text: message, sender: "user" }];
    setMessages(updatedMessages);
    setIsLoading(true);
    
    try {
      // Convert messages to OpenAI format for context
      const historyForAPI: OpenAIMessage[] = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));
      
      // Get bot response
      const botResponse = await getChatResponse(message, historyForAPI);
      
      // Add bot response to the chat
      setMessages([...updatedMessages, { text: botResponse || "No response received", sender: "bot" }]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      setMessages([...updatedMessages, { text: "Sorry, something went wrong. Please try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isLoading && <div className="loading-indicator">AI is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;