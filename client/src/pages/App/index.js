import jwtDecode from "jwt-decode"
import React, { Component } from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import { setAuthHeader } from "../../libs/api"
import store from "../../libs/redux"
import { getStarProjects } from "../../libs/redux/actions"
import SignIn from "../Auth/SignIn"
import SignUp from "../Auth/SignUp"
import Category from "../Category"
import Homepage from "../Homepage"
import Project from "../Project"
import Upload from "../Upload"
import User from "../User"
import Admin from "../Admin"
import "./index.css"
import Navbar from "./Navbar"

class App extends Component {
    componentDidMount() {
        if (localStorage.token) {
            setAuthHeader(localStorage.token)
            try {
                let payload = jwtDecode(localStorage.token)
                store.dispatch({
                    type: "SIGN_IN",
                    payload
                })
                store.dispatch(getStarProjects())
            } catch (error) {}
        }
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <Route exact path="/" component={Homepage} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/users/:id" component={User} />
                    <Route path="/projects/:id" component={Project} />
                    <Route path="/categories/:id" component={Category} />
                    <Route path="/admin" component={Admin} />
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App
