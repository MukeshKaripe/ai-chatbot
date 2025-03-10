import React from "react";
import ChatWindow from "../components/ChatWindow";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>AI Chatbot</h1>
      <ChatWindow />
    </div>
  );
};

export default Home;