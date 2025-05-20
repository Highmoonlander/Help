import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../components/AuthContext';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();


  useEffect (()=>{
      if(!token){
        navigate('/login')
      }
    }, [token])
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">🛒 Welcome to FreshBasket</h1>
      <p className="lead">Your daily dose of fresh groceries delivered to your doorstep!</p>

      <button className="btn btn-success mt-3" onClick={() => navigate('/catalog')}>
        Explore Catalog
      </button>

      <div className="mt-5">
        <h4>Why Shop With Us?</h4>
        <ul className="list-unstyled">
          <li>✅ Fresh fruits & vegetables daily</li>
          <li>✅ Affordable prices</li>
          <li>✅ Fast delivery</li>
        </ul>
      </div>
    </div>
  );
}