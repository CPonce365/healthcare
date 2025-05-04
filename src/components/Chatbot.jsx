import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 320, height: 400 });

  const chatRef = useRef(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const toggleChat = () => setShowChat(!showChat);

  useEffect(() => {
    if (showChat && chatRef.current) {
      const chatBox = chatRef.current;
      const width = chatBox.offsetWidth || 320;
      const height = chatBox.offsetHeight || 400;
      const x = window.innerWidth - width - 20;
      const y = window.innerHeight - height - 100;
      setPosition({ x, y });
    }
  }, [showChat]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      if (isDragging.current) {
        setPosition((prev) => ({
          x: Math.max(0, prev.x + dx),
          y: Math.max(0, prev.y + dy),
        }));
      }

      if (isResizing.current) {
        setDimensions((prev) => ({
          width: Math.max(280, prev.width - dx),
          height: Math.max(300, prev.height - dy),
        }));
        setPosition((prev) => ({
          x: Math.max(0, prev.x + dx),
          y: Math.max(0, prev.y + dy),
        }));
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDragStart = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    isResizing.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      const reply = data.reply || '⚠️ Sorry, I didn’t catch that.';
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Error connecting to chatbot.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-5 right-5 bg-[#20B486] text-white px-5 py-3 rounded-full shadow-md hover:bg-[#169a6b] z-50"
        onClick={toggleChat}
      >
        {showChat ? 'Close Chat' : 'Chat with us 💬'}
      </button>

      {/* Chat Window */}
      {showChat && (
        <div
          ref={chatRef}
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
          className="fixed bg-white border rounded-xl shadow-lg flex flex-col z-50"
        >
          {/* Resize Handle (Top-Left) */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 w-4 h-4 bg-gray-300 cursor-nwse-resize rounded-tr-md z-10"
            title="Resize"
          />

          {/* Draggable Header */}
          <div
            className="p-4 font-semibold border-b cursor-move select-none"
            onMouseDown={handleDragStart}
          >
            🤖 HealthBot
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'user'
                    ? 'bg-[#e6fffa] self-end ml-auto text-right'
                    : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="p-2 bg-gray-100 rounded-lg text-sm text-gray-600 w-fit">
                Chatbot is typing...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <button
              type="submit"
              className="bg-[#20B486] text-white px-3 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
