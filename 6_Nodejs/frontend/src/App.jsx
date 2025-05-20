import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Register from './pages/Register';
import { AuthProvider } from './components/AuthContext';
import NavigationBar from './components/NavigationBar';

const LayoutWithNav = ({ children }) => (
  <>
    <NavigationBar />
    {children}
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="/home" element={<LayoutWithNav><Home /></LayoutWithNav>} />
          <Route path="/catalog" element={<LayoutWithNav><Catalog /></LayoutWithNav>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;