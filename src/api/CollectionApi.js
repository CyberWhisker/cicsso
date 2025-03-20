export const fetchCollections = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const storeCollection = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateCollection = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/${formData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const deleteCollection = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionWithTransactionByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getCollectionWithTransactionByUserId/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionBySchoolYear = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getCollectionBySchoolYear/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionWithEventAndAttendance = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getCollectionWithEventsAndAttendance/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionWithTransaction = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getCollectionWithTransaction`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionWithTransactionBySchoolYear = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getDataWithTransactionBySchoolYearId/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionBySchoolYearIdandUserId = async (schoolYearId, userId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getDataBySchoolYearAndUserId/${schoolYearId}/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const fetchCollectionBySchoolYearWithRemainingBalance = async (schoolYearId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/collection/getCollectionBySchoolYearWithRemainingBalance/${schoolYearId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}