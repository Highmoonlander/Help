import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState(null);

    const login = (jwt) => {
        setToken(jwt);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{login, logout, token}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
