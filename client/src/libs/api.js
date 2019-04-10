import axios from "axios"

export const setAuthHeader = token => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const removeAuthHeader = () => {
    delete axios.defaults.headers.common["Authorization"]
}

export default axios.create()
