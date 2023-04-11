import React, { useState } from "react";
import "../App.css";
import axios from "axios";

interface Message {
  sender: string;
  text: string;
}

interface InputContainerProps {
  onMessageSend: (message: Message) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({ onMessageSend }) => {
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSend = async () => {
    if (inputMessage.trim() === "") return;
    onMessageSend({ sender: "You", text: inputMessage });

    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        userMessage: [{ role: "user", content: inputMessage }],
      });

      if (response.data.content) {
        onMessageSend({ sender: "Assistant", text: response.data.content });
      }
    } catch (error) {
      onMessageSend({
        sender: "Assistant",
        text: "An error occurred while processing the request.",
      });
    }

    setInputMessage("");
  };

  return (
    <div className="input-container">
    <input
      type="text"
      placeholder="Type your message here..."
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    <button onClick={handleSend}>Send</button>
  </div>
);
};

export default InputContainer;

