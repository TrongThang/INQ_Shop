import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Kiểm tra token trong Local Storage
        const token = localStorage.getItem("authToken");
        if (!!token) {
            setIsAuthenticated(true);    
        }
    }, []);

    const login = () => {
        // localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };

export const useAuth = () => useContext(AuthContext);