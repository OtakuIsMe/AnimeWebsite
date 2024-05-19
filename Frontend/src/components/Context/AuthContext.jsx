import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import axios from 'axios';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            login(token);
        }
    }, []);

    const login = async (token) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/token`, { token });
            setUser(response.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    const logout = ()=>{
        setUser(null)
        Cookies.remove('token')
    }

    return (
        <AuthContext.Provider value={{ user, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;