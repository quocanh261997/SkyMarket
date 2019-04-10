import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { signIn } from "../../libs/redux/actions"
import { INVALID_EMAIL, INVALID_PASSWORD } from "../../libs/redux/types"

class SignIn extends Component {
    state = {
        userInput: "",
        password: "",
        error: ""
    }

    onSignIn = e => {
        e.preventDefault()
        this.setState({ error: "" })
        const { userInput, password } = this.state
        if (userInput && password)
            this.props
                .signIn(userInput, password)
                .then(() => this.props.history.push("/"))
                .catch(error => this.setState({ error: error.message }))
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <form className="auth-form" onSubmit={this.onSignIn}>
                    <h2 style={{ marginBottom: "1em" }}>Sign In</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="userInput"
                            className={
                                "form-control" +
                                (this.state.error === INVALID_EMAIL
                                    ? " is-invalid"
                                    : "")
                            }
                            placeholder="Username or Email"
                            autoComplete="off"
                            value={this.state.userInput}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                            Cannot find email / username
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className={
                                "form-control" +
                                (this.state.error === INVALID_PASSWORD
                                    ? " is-invalid"
                                    : "")
                            }
                            placeholder="Password"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                            Incorrect password
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        style={{ marginBottom: "2em" }}>
                        Submit
                    </button>
                    <Link to="/signup">Don't have an account?</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(
    connect(
        () => ({}),
        { signIn }
    )(SignIn)
)
