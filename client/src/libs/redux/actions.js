import api, { removeAuthHeader, setAuthHeader } from "../api"
import {
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
    return dispatch => {
        return api
            .post("/signup", {
                username,
                email,
                password
            })
            .then(({ data: { token, ...payload } }) => {
                setAuthHeader(token)
                dispatch({
                    type: SIGN_IN,
                    payload
                })
            })
            .catch(error => {
                throw new Error(error.response.data.type)
            })
    }
}

export const signIn = (userInput, password) => {
    return async dispatch => {
        return api
            .post("/signin", {
                userInput,
                password
            })
            .then(({ data: { token, ...payload } }) => {
                setAuthHeader(token)
                dispatch({
                    type: SIGN_IN,
                    payload
                })
            })
            .catch(error => {
                throw new Error(error.response.data.type)
            })
    }
}

export const signOut = () => {
    return dispatch => {
        removeAuthHeader()
        dispatch({
            type: SIGN_OUT
        })
    }
}
