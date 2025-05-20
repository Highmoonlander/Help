import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavigationBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // clear auth data
    navigate('/login'); // redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <span className="navbar-brand">EzGrocery</span>
        <ul className="navbar-nav d-flex flex-row gap-4">
          <li className="nav-item">
            <span className="nav-link" role="button" onClick={() => navigate('/home')}>Home</span>
          </li>
          <li className="nav-item">
            <span className="nav-link" role="button" onClick={() => navigate('/catalog')}>Catalog</span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-danger" role="button" onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}