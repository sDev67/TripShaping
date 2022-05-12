import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext, useContext } from 'react';
import { checkStatus, url_prefix } from '../utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signup = (credentials) => {

        return fetch(`${url_prefix}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
    };

    const signin = (credentials) => {
        return fetch(`${url_prefix}/user/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
            .then(res => res.json())
            .then(async data => {
                await AsyncStorage.setItem('token', data.token)
                setUser(data.user);
            });
    };

    const signout = async () => {
        const token = await AsyncStorage.getItem('token');
        await AsyncStorage.removeItem('token')
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
