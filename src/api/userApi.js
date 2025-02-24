// Fetch all Users
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

// Fetch all Users
export const fetchUserById = async (id) => {
    try {
        // Fetch user data
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Parse the JSON responses
        const data = await response.json();

        return { data: data, error: null };

    } catch (error) {
        return { data: null, error };
    }
};

export const verifyUser = async (token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token })
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null }
        } else {
            return { data: [], error: 'verification failed' }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const userLogin = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null }
        } else {
            return { data: [], error: 'Login Failed' }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const storeUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null }
        } else {
            return { data: [], error: 'Failed to store' }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const updateUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/${formData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null }
        } else {
            return { data: [], error: 'Failed to updated' }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const deleteUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/${formData._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null }
        } else {
            return { data: [], error: 'Failed to Delete' }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchUsersWithAttendanceBySchedId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/getUsersWithAttendanceBySchedId/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Users with Attendace');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

export const fetchUsersWithAttendance = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/getUsersWithAttendance`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (!response.ok) {
            return { data: [], error: data.error };
        } else {
            return { data: data, error: null };
        }
    } catch (error) {
        return { data: [], error };
    }
};

export const storeMultipleUsers = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/storeMultipleUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!response.ok) {
            return { data: [], error: data.error };
        } else {
            return { data: data, error: null };
        }
    } catch (error) {
        return { data: [], error };
    }
};

export const fetchUsersWithTransactionByAY = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user/getUsersWithTransactionByAY/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return { data: [], error: data.error };
        } else {
            return { data: data, error: null };
        }
    } catch (error) {
        return { data: [], error };
    }
};