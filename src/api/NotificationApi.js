export const fetchNotification = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/notification`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Something went wrong'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const fetchNotificationByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/notification/getDataByUserId/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Something went wrong'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const updateNotification = async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/notification/${data._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Something went wrong'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const deleteNotification = async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/notification/${data._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Something went wrong'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}