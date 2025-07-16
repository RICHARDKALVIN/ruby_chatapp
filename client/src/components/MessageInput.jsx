import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    onSend(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSend} className="flex p-4 border-t bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="ml-4 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
