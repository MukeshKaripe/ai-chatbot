import React, { useState } from "react";
import ChatMessage from "./ChatBox";
import ChatInput from "./ChatInput";
import { getChatResponse } from "../services/openAIservices";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hello! How can I help you?", sender: "bot" }
  ]);

  const handleSendMessage = async (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);

    const botResponse = await getChatResponse(message);
    setMessages([...messages, { text: message, sender: "user" }, { text: botResponse, sender: "bot" }]);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
