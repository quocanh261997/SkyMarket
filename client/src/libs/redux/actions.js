import api, { removeAuthHeader, setAuthHeader } from "../api"
import { SIGN_IN, SIGN_OUT, STAR_PROJECT, STAR_PROJECTS } from "./types"

export const signUp = (username, email, password) => {
    return dispatch => {
        return api("post", "/users/signup", {
            username,
            email,
            password
        })
            .then(({ token, ...payload }) => {
                setAuthHeader(token)
                localStorage.setItem("token", token)
                dispatch({
                    type: SIGN_IN,
                    payload
                })
            })
            .catch(error => {
                throw new Error(error.type)
            })
    }
}

export const signIn = (userInput, password) => {
    return async dispatch => {
        return api("post", "/users/signin", {
            userInput,
            password
        })
            .then(({ token, ...payload }) => {
                setAuthHeader(token)
                localStorage.setItem("token", token)
                dispatch({
                    type: SIGN_IN,
                    payload
                })
            })
            .catch(error => {
                throw new Error(error.type)
            })
    }
}

export const signOut = () => {
    return dispatch => {
        removeAuthHeader()
        localStorage.removeItem("token")
        dispatch({
            type: SIGN_OUT
        })
    }
}

export const getStarProjects = () => {
    return (dispatch, getState) => {
        const {
            authReducer: { _id }
        } = getState()
        api("get", `/users/${_id}/starProjects`)
            .then(({ starProjects }) => {
                dispatch({
                    type: STAR_PROJECTS,
                    starProjects
                })
            })
            .catch(error => {
                throw new Error(error.type)
            })
    }
}

export const starProject = (id, star) => {
    return dispatch => {
        return api("put", `/projects/${id}/star`, {
            star
        })
            .then(() => {
                dispatch({
                    type: STAR_PROJECT,
                    project: id,
                    star
                })
            })
            .catch(error => {
                throw new Error(error.type)
            })
    }
}
