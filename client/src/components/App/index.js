import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Category from "../Category"
import Homepage from "../Homepage"
import Project from "../Project"
import SignIn from "../SignIn"
import "./index.css"
import Navbar from "./Navbar"

class App extends React.Component {
    render() {
        return (
            <Router>
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
