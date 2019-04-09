import {
    FETCH_PROJECTS,
    FETCH_PROJECT_CATEGORY,
    FETCH_PROJECT_NAME,
    SIGN_IN,
    AUTH_ERROR,
    SIGN_OUT
} from "./types"
import db from "../db"
import history from "../history"

export const fetchProjects = () => {
    return async dispatch => {
        const response = await db.get("/")
        dispatch({
            type: FETCH_PROJECTS,
            payload: response
        })
    }
}

export const fetchProjectCategory = category => {
    return async dispatch => {
        const response = await db.get(`/category/${category}`)
        dispatch({
            type: FETCH_PROJECT_CATEGORY,
            payload: response
        })
    }
}

export const fetchProjectName = name => {
    return async dispatch => {
        const response = await db.get("/search", {
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

export const signUp = (username, password) => {
    return async dispatch => {
        try {
            const response = await db.post("/signup", {
                username,
                password
            })
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

export const signIn = (username, password) => {
    return async dispatch => {
        try {
            const response = await db.post("/signin", {
                username,
                password
            })
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
    return {
        type: SIGN_OUT
    }
}
