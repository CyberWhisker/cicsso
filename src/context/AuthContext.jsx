import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default: 
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
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
