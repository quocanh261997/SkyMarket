import { SIGN_IN, SIGN_OUT, STAR_PROJECTS, STAR_PROJECT } from "./types"

const INITIAL_AUTH_STATE = {
    _id: "",
    username: "",
    photo: "",
    permissionLevel: 0,
    starProjects: []
}

export const authReducer = (state = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, ...action.payload }
        case SIGN_OUT:
            return INITIAL_AUTH_STATE
        case STAR_PROJECTS:
            return { ...state, starProjects: action.starProjects }
        case STAR_PROJECT:
            return {
                ...state,
                starProjects: action.star
                    ? [...state.starProjects, action.project]
                    : state.starProjects.filter(p => p !== action.project)
            }
        default:
            return state
    }
}
