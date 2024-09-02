import { fetchUserById } from "./userApi";

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