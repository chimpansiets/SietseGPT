import React, { useState } from "react";
import "./App.css";
import ChatContainer from "./components/ChatContainer";
import InputContainer from "./components/InputContainer";

interface Message {
  sender: string;
  text: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const handleMessageSend = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="App">
      <h1>SietseGPT, Chat with my AI-clone to know more about me.</h1>
      <ChatContainer messages={messages} />
      <InputContainer onMessageSend={handleMessageSend} />
    </div>
  );
};

export default App;
