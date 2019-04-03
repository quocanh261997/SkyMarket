import React, { Component } from "react"

class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        Logo
                    </a>
                    <form className="form-inline">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                        />
                    </form>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Browse
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Sign In
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar
