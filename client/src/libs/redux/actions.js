import api from "../api"
import { setAuthHeader, removeAuthHeader } from "../api"
import {
    AUTH_ERROR,
    FETCH_PROJECTS,
    FETCH_PROJECT_CATEGORY,
    FETCH_PROJECT_NAME,
    SIGN_IN,
    SIGN_OUT
} from "./types"

export const fetchProjects = () => {
    return async dispatch => {
        const response = await api.get("/")
        dispatch({
            type: FETCH_PROJECTS,
            payload: response
        })
    }
}

export const fetchProjectCategory = category => {
    return async dispatch => {
        const response = await api.get(`/category/${category}`)
        dispatch({
            type: FETCH_PROJECT_CATEGORY,
            payload: response
        })
    }
}

export const fetchProjectName = name => {
    return async dispatch => {
        const response = await api.get("/search", {
            params: {
                q: name
            }
        })
        dispatch({
            type: FETCH_PROJECT_NAME,
            payload: response
        })
    }
}

export const signUp = (username, email, password) => {
    return async dispatch => {
        try {
            const response = await api.post("/signup", {
                username,
                email,
                password
            })
            console.log(response)
            dispatch({
                type: SIGN_IN,
                payload: username
            })
            // history.push("/")
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

export const signIn = (userInput, password) => {
    return async dispatch => {
        try {
            const { token, username } = await api.post("/signin", {
                userInput,
                password
            })
            setAuthHeader(token)
            dispatch({
                type: SIGN_IN,
                payload: username
            })
            // history.push("/")
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        removeAuthHeader()
        dispatch({
            type: SIGN_OUT
        })
    }
}
