import { toast } from "react-toastify";

export const getUsers = async (setData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        });
        if (response.ok) {
            const data = await response.json()
            setData(data)
        } else {
            toast.error('Failed to Get Data')
        }
    } catch (error) {
        toast.error('Server Error')
    }
}