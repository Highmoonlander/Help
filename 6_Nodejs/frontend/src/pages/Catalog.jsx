import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

var items = [
  { id: 1, name: 'Fresh Apples', price: '₹120/kg' },
  { id: 2, name: 'Organic Tomatoes', price: '₹45/kg' },
  { id: 3, name: 'Bananas', price: '₹55/dozen' },
  { id: 4, name: 'Potatoes', price: '₹30/kg' },
];

// async function getItems() {
//   try{
//       const res = await axios.get("http://localhost:3000/getItems");
//       items = res.data;
//   }
//   catch(err){
//     console.log(err);
//   }
// }

export default function Catalog() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect (()=>{
    if(!token){
      navigate('/login')
    }
  }, [token])

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛍️ Product Catalog</h2>

      <div className="row">
        {items.map((item) => (
          <div className="col-md-3" key={item.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: {item.price}</p>
                <button className="btn btn-primary btn-sm">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}