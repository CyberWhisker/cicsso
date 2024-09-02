export const fetchRoles = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
}