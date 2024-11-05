export const fetchSignatories = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/signatories`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: "Server Error"}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const storeSignatorie = async (formData) => {
    try {
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        const response = await fetch(`${import.meta.env.VITE_API}/api/signatories`, {
            method: 'POST',
            body: formDataObject
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: "Server Error"}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const updateSignatories = async (formData) => {
    try {
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        const response = await fetch(`${import.meta.env.VITE_API}/api/signatories/${formData._id}`, {
            method: 'PATCH',
            body: formDataObject
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: "Server Error"}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const deleteSignatories = async (formData) => {
    try {
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        const response = await fetch(`${import.meta.env.VITE_API}/api/signatories/${formData._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: "Server Error"}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}