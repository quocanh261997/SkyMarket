import React from "react"
import { Router, Route } from "react-router-dom"
import Category from "../Category"
import Homepage from "../Homepage"
import Project from "../Project"
import SignIn from "../SignIn"
import Navbar from "./Navbar"
import history from "../history"
import "./index.css"

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Navbar />
                <Route exact path="/" component={Homepage} />
                <Route path="/:id" component={Project} />
                <Route path="/category/:id" component={Category} />
                <Route path="/signin" component={SignIn} />
            </Router>
        )
    }
}

export default App
