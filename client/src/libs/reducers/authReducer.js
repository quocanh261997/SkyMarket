import { SIGN_IN, SIGN_OUT } from "../actions/types"

const INITIAL_STATE = {
    isSignedIn: false,
    username: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, username: action.payload }
        case SIGN_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}
