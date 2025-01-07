export const fetchEvent = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/event`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const fetchEventBySchoolYear = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/event/getEventBySchoolYear/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const fetchEventsWithAttendanceByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/event/fetchEventsWithAttendanceByUserId/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}