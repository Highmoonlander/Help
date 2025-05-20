
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            // Simulate an API call
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'user' && password === 'password') {
                        resolve({ username });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                }, 1000);
            });
            setUser(response);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    } 
    return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, logout }}>
        {children}
    </AuthContext.Provider>)
}


export const useAuth = () => useContext(AuthContext);