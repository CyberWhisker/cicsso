import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_API}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            navigate('/')
        }
    }

    return {login, loading, error}
}