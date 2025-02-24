import React, { useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);

    const response = await getBotResponse(input);

    setMessages([...messages, { text: input, sender: "user" }, { text: response, sender: "bot" }]);
    setInput("");
  };

  const getBotResponse = async (userInput) => {
    try {
      const apiKey = ""; // Replace with your OpenAI API key
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are an AI healthcare assistant. Provide accurate but cautious health advice." },
            { role: "user", content: userInput }
          ],
          max_tokens: 100
        },
        {
          headers: {
            "Authorization": "Bearer" + apiKey,
            "Content-Type": "application/json"
          }
        }
      );
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
      return "I'm sorry, but I couldn't process your request. Please try again later.";
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle-btn">
        💬 Chat
      </button>

      <div className="chat-window">
        <div className="chat-header">
          <h4>HealthAI Assistant</h4>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
