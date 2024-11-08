export const fetchClearances = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/clearance`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch Clearance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const storeClearance = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/clearance`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error('Failed to store Clearance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const updateClearance = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/clearance${formData._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error('Failed to store Clearance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const deleteClearance = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/clearance${formData._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            throw new Error('Failed to store Clearance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}