// client/src/components/ChatRoom.
import axios from 'axios';
import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Fetch all messages
  const getMessages = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const res = await axios.get('http://localhost:5000/api/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(res.data); // Optional for debug
      setMessages(res.data); // ✅ UNCOMMENT THIS!
    } catch (error) {
      console.error('❌ Failed to fetch messages:', error.response?.data || error.message);
    }
  };
  

  // Send a message
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await API.post('/messages', { content: text });
      setText('');
      getMessages(); // refresh
    } catch (err) {
      setError('Failed to send message');
    }
  };

  useEffect(() => {
    getMessages();

    // Set up polling every 3 seconds
    const interval = setInterval(getMessages, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-purple-600 text-white text-lg font-bold p-4">
        💬 Ruby Chat Room
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white shadow p-2 rounded border border-gray-200"
          >
            <p className="font-semibold text-purple-700">{msg.sender.username}</p>
            <p className="text-sm">{msg.content}</p>
            <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-center p-2 bg-red-100 border-t border-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
