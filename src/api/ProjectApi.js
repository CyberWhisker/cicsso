export const fetchProjects = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/project`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Failed to fetch Project'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const fetchProjectByID = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/project/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Failed to fetch Project'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const fetchProjectBySchoolYear = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/project/getDataBySchoolYearId/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Failed to fetch Project'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const storeProject = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Failed to store Project'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const deleteProject = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/project/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            return { data: [], error: 'Failed to delete Project'}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}

export const updateProject = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/project/${dataForm._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        })
        if (response.ok) {
            const data = await response.json()
            return { data: data, error: null}
        } else {
            const data = await response.json()
            return { data: [], error: data.error}
        }
    } catch (error) {
        return { data: [], error: error.message}
    }
}