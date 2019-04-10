import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
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
                    style={{ border: "none", marginRight: 5 }}
                >
                    Sign In
                </Link>
            )
        } else {
            return (
                <div>
                    <h2>{this.props.username}</h2>
                    <button onClick={this.props.signOut}>Sign Out</button>
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
                }
            >
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img style={{ width: 60 }} src={Logo} alt="Logo" />
                    </a>
                    <div>
                        <Link
                            to="/"
                            className="btn btn-outline"
                            style={{ border: "none", marginRight: 5 }}
                        >
                            Browse
                        </Link>
                        {this.renderUsername()}
                        <button
                            className="navbar-toggler d-md-none"
                            type="button"
                            data-toggle="collapse"
                            data-target="#sidebar"
                            aria-controls="sidebar"
                            aria-expanded="false"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.username
    }
}

export default connect(
    mapStateToProps,
    { signOut }
)(Navbar)
