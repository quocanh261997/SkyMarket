import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import reduxThunk from "redux-thunk"
import * as reducers from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(reduxThunk))
)
