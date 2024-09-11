import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { auth: action.payload };
        case 'LOGOUT':
            return { auth: null };
        default: 
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        auth: null
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
            dispatch({ type: 'LOGIN', payload: auth });
        }
        setIsLoading(false); // Set loading to false after checking localStorage
    }, []);

    if (isLoading) {
        // Optionally, you can render a loading screen or a spinner here while loading
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
