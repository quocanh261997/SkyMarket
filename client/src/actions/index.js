import {
    FETCH_PROJECTS,
    FETCH_PROJECT_CATEGORY,
    FETCH_PROJECT_NAME
} from "./types"
import db from "../db"

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
