import { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import API from './api/axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setLoading(false); // ✅ no token = stop loading
        return;
      }
  
      try {
        const res = await API.get('/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.username);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false); // ✅ finish loading in all cases
      }
    };
  
    checkAuth();
  }, []);
  
  

  if (loading) return <div className="p-4">Loading...</div>;

  return user ? <ChatRoom /> : <Login onLogin={setUser} />;
}

export default App;
