import React, { useState } from 'react';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { sender: 'user', content: input };
    setChatLog((prev) => [...prev, userMessage]);
    setInput('');

    console.log('Sending message to backend:', input);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      console.log('Received reply from server:', data.reply);

      const botMessage = { sender: 'bot', content: data.reply };
      setChatLog((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Fetch error:', err);
      setChatLog((prev) => [
        ...prev,
        { sender: 'bot', content: 'Error: Could not fetch a response from the server.' },
      ]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mt-10">
      <h2 className="text-xl font-semibold mb-4">VitalSync Chat Assistant</h2>

      <div className="h-64 overflow-y-auto mb-4 border p-4 rounded bg-gray-50">
        {chatLog.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-3 py-2 rounded-md ${
                msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-[#20B486] text-white px-4 py-2 rounded-md font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
