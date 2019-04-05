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
<<<<<<< HEAD
                className="navbar sticky-top navbar-expand-lg navbar-light"
                style={{
                    backgroundColor: "white",
                    boxShadow: this.state.shadow ? "0px 1px 10px #555" : ""
                }}
            >
=======
                className={
                    "navbar sticky-top navbar-expand-lg navbar-light navbar-white" +
                    (this.state.shadow ? " navbar-shadow" : "")
                }>
>>>>>>> 2b0074c6e43661a56ae248cf98ed32de60a7703d
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
<<<<<<< HEAD
                        aria-label="Toggle navigation"
                    >
=======
                        aria-label="Toggle navigation">
>>>>>>> 2b0074c6e43661a56ae248cf98ed32de60a7703d
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="menu">
                        <div className="navbar-nav ml-auto">
                            <button
                                className="btn btn-outline"
<<<<<<< HEAD
                                style={{ border: "none" }}
                            >
=======
                                style={{ border: "none" }}>
>>>>>>> 2b0074c6e43661a56ae248cf98ed32de60a7703d
                                Browse
                            </button>
                            <button
                                className="btn btn-outline"
<<<<<<< HEAD
                                style={{ border: "none" }}
                            >
=======
                                style={{ border: "none" }}>
>>>>>>> 2b0074c6e43661a56ae248cf98ed32de60a7703d
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
