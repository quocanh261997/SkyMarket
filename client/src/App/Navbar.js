import React, { Component } from "react"
import Logo from "../static/Logo.png"

class Navbar extends Component {
    state = {
        shadow: false
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = () => {
        if (window.pageYOffset > 10) {
            if (!this.state.shadow)
                this.setState({
                    shadow: true
                })
        } else
            this.setState({
                shadow: false
            })
    }

    render() {
        return (
            <nav
                className="navbar sticky-top navbar-expand-lg navbar-light"
                style={{
                    backgroundColor: "white",
                    boxShadow: this.state.shadow ? "0px 1px 10px #555" : ""
                }}>
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img style={{ width: 60 }} src={Logo} alt="Logo" />
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
