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
                className={
                    "navbar sticky-top navbar-expand-lg navbar-light navbar-white" +
                    (this.state.shadow ? " navbar-shadow" : "")
                }
            >
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
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="menu">
                        <div className="navbar-nav ml-auto">
                            <button
                                className="btn btn-outline"
                                style={{ border: "none" }}
                            >
                                Browse
                            </button>
                            <button
                                className="btn btn-outline"
                                style={{ border: "none" }}
                            >
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
