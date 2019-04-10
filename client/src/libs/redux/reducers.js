import { SIGN_IN, SIGN_OUT } from "./types"

const INITIAL_AUTH_STATE = {
    isSignedIn: false,
    username: null
}

export const authReducer = (state = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, username: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, username: null }
        default:
            return state
    }
}
