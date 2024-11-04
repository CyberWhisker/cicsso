export const fetchSchoolYear = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/schoolYear`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: "Server Request Error"}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const storeSchoolYear = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/schoolYear`, {
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
            return {data: [], error: "Server Request Error"}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const updateSchoolYear = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/schoolYear/${formData._id}`, {
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
            return {data: [], error: "Server Request Error"}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const deleteSchoolYear = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/schoolYear/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: "Server Request Error"}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}