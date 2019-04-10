import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn, signUp } from "../../libs/actions"
import FacebookAuth from "./FacebookAuth"
import GoogleAuth from "./GoogleAuth"

class SignIn extends Component {
    state = {
        username: "",
        password: ""
    }

    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state
        if (username && password) this.props.signIn(username, password)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
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
                        Submit
                    </button>
                </form>
                <GoogleAuth />
                <FacebookAuth />
            </div>
        )
    }
}

export default connect(
    () => ({}),
    { signIn, signUp }
)(SignIn)
