export const fetchAttendances = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/attendance`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const fetchAttendanceBySchedule = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/attendance/sched/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const fetchAttendanceByUserId = async (id) => {
    console.log(id)
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/attendance/user/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch attendance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const storeAttendance = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/attendance`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const deleteAttendance = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/attendance/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to Delete Attendance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const updateAttendance = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/attendance/${formData._id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to update Attendance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}