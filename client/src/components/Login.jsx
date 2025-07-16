// client/src/components/Login.jsx
import { useState } from 'react';
import API from '../api/axios';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    try {
      const route = isRegister ? 'auth/register' : 'auth/login';
      const { data } = await API.post(route, { username, password });

      if (!isRegister) {
        localStorage.setItem('token', data.token);
        onLogin(data.username);
      } else {
        alert('Registration successful! Now login.');
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Auth error');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {isRegister ? 'Register' : 'Login'} to Ruby Chat
        </h2>

        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleAuth}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p
          className="text-center text-sm cursor-pointer text-blue-600 hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already have an account? Login' : 'No account? Register here'}
        </p>
      </div>
    </div>
  );
}
