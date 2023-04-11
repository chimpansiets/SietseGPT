import React from "react";
import "../App.css";

interface Message {
  sender: string;
  text: string;
}

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender.toLowerCase()}`}>
          <div className="message-content">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
