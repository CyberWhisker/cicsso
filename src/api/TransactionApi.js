export const fetchTransactions = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/transaction`, {
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

export const fetchTransactionByCollectionId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/transaction/collection/${id}`, {
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

export const storeTransaction = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/transaction`, {
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

export const updateTransaction = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/transaction/${formData._id}`, {
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

export const deleteTransaction = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/transaction/${id}`, {
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