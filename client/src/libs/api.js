import axios from "axios"

export const setAuthHeader = token => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const removeAuthHeader = () => {
    delete axios.defaults.headers.common["Authorization"]
}

export default (method, path, data) => {
    return new Promise((resolve, reject) => {
        axios[method](path, data)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data))
    })
}
