export const fetchScheduleById = async (id) => 
{
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/schedule/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch schedule');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
}

export const fetchSchedule = async () => 
{
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/schedule`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch schedule');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
}