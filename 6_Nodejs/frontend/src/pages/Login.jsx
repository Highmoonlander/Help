import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // const res = await axios.post('http://localhost:3000/login', {
      //   username,
      //   password
      // });
        const data = {
            username: 'Arya',
            token : 'res.data.token'
        }
        login(data.token); 
        navigate('/home')
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Welcome Back!</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>

        
        <div className="container">
          <a href='/register'>New Here?</a>
        </div>
      </div>
    </>
  );
}