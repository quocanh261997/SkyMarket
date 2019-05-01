import api, { removeAuthHeader, setAuthHeader } from "../api"
import { SIGN_IN, SIGN_OUT } from "./types"

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
