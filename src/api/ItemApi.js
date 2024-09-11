export const fetchItem = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/item`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const fetchItemByProjectId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/item/project/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const storeItem = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const updateItem = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/item/${formData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const deleteItem = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/item/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}