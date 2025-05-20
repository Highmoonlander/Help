import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/register', {
        username,
        password
      });
        const data = {
            username: res.data.username,
            token : res.data.token
        }
        login(data.token); 
        navigate('/home')
    } catch (err) {
      setError('Registration failed.');
      console.error(err);
    }
  };

  return (
    <>
        <div className="container mt-5">
        <h2 className="mb-4">Welcome New User!</h2>

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

        <button className="btn btn-primary" onClick={handleRegister}>
            Register
        </button>

        </div>
        <div className="container">
            <a href='/'>Already Registered?</a>
        </div>
    </>
  );
}