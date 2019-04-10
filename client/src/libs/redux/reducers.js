import { SIGN_IN, SIGN_OUT } from "./types"

const INITIAL_AUTH_STATE = {
    _id: "",
    username: "",
    photo: ""
}

export const authReducer = (state = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return action.payload
        case SIGN_OUT:
            return INITIAL_AUTH_STATE
        default:
            return state
    }
}
