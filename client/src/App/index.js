import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Category from "../Category"
import Homepage from "../Homepage"
import Project from "../Project"
import SignIn from "../SignIn"
import Navbar from "./Navbar"

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={Homepage} />
                <Route path="/:id" component={Project} />
                <Route path="/category/:id" component={Category} />
                <Route path="/signin" component={SignIn} />
            </BrowserRouter>
        )
    }
}

export default App
