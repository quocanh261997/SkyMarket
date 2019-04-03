import React, { Component } from "react"
import Logo from "../static/Logo.png"

class Navbar extends Component {
    render() {
        return (
            <nav
                className="navbar sticky-top navbar-expand-lg navbar-light"
                style={{ backgroundColor: "white" }}>
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img style={{ height: 35 }} src={Logo} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#menu"
                        aria-controls="menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="menu">
                        <div class="navbar-nav ml-auto">
                            <button
                                class="btn btn-outline-secondary"
                                style={{ border: "none" }}>
                                Browse
                            </button>
                            <button
                                class="btn btn-outline-secondary"
                                style={{ border: "none" }}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
