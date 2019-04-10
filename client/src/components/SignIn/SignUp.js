import React, { Component } from "react"
import { connect } from "react-redux"
import { signUp } from "../../libs/redux/actions"
import { withRouter } from "react-router-dom"

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: ""
    }

    onSignUp = e => {
        e.preventDefault()
        const { username, password, email } = this.state
        if (username && password && email) {
            this.props.signUp(username, email, password)
            this.props.history.push("/")
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSignUp}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Enter username"
                            autoComplete="off"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            autoComplete="off"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign Up
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(
    connect(
        () => ({}),
        { signUp }
    )(SignUp)
)
