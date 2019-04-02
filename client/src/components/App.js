import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import HomePage from "./HomePage"
import CategoryPage from "./CategoryPage"
import SignInPage from "./SignInPage"
import ProjectPage from "./ProjectPage"
import NavBar from "./NavBar"

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <BrowserRouter>
                    <NavBar />
                    <Route exact path="/" component={HomePage} />
                    <Route path="/:id" component={ProjectPage} />
                    <Route path="/category/:id" component={CategoryPage} />
                    <Route path="/signin" component={SignInPage} />
                </BrowserRouter>
            </div>
        )
    }
}

export default App
