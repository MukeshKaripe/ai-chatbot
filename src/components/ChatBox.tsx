import React from "react";

interface ChatMessageProps {
  text: string;
  sender: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  return (
    <div className={`message ${sender === "user" ? "user-message" : "bot-message"}`}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;