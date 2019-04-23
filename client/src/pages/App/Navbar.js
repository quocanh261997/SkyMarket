import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { signOut } from "../../libs/redux/actions"
import Logo from "../../static/Logo.png"

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

    renderUsername = () => {
        if (!this.props.username) {
            return (
                <Link
                    to="/signin"
                    className="btn btn-outline"
                    style={{ border: "none", marginRight: 10 }}>
                    Sign In
                </Link>
            )
        } else {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <div className="dropdown">
                        <button
                            style={{
                                marginRight: 10,
                                background: "transparent",
                                border: "none",
                                outline: "none"
                            }}
                            className="dropdown-toggle"
                            id="dropdownUser"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Hello {this.props.username}!
                        </button>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownUser">
                            <Link to="/upload" className="dropdown-item">
                                Upload
                            </Link>
                            <span
                                className="dropdown-item"
                                onClick={this.props.signOut}>
                                Sign Out
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <nav
                className={
                    "navbar sticky-top navbar-expand-lg navbar-light navbar-white" +
                    (this.state.shadow ? " navbar-shadow" : "")
                }>
                <div className="container">
                    <span className="navbar-brand">
                        <img style={{ width: 60 }} src={Logo} alt="" />
                    </span>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                        <Link
                            to="/"
                            className="btn btn-outline"
                            style={{ border: "none", marginRight: 10 }}>
                            Browse
                        </Link>
                        {this.renderUsername()}
                        {this.props.location.pathname === "/" && (
                            <button
                                className="navbar-toggler d-md-none"
                                type="button"
                                data-toggle="collapse"
                                data-target="#sidebar"
                                aria-controls="sidebar"
                                aria-expanded="false">
                                <span className="navbar-toggler-icon" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(
    connect(
        ({ authReducer: { username } }) => ({ username }),
        { signOut }
    )(Navbar)
)
