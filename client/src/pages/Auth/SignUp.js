import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { signUp } from "../../libs/redux/actions"
import { DUPLICATE_EMAIL, DUPLICATE_USERNAME } from "../../libs/redux/types"

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        error: ""
    }

    onSignUp = e => {
        e.preventDefault()
        this.setState({ error: "" })
        const { username, password, email } = this.state
        if (username && password && email) {
            this.props
                .signUp(username, email, password)
                .then(() => this.props.history.push("/"))
                .catch(error => this.setState({ error: error.message }))
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <form className="auth-form" onSubmit={this.onSignUp}>
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            className={
                                "form-control" +
                                (this.state.error === DUPLICATE_USERNAME
                                    ? " is-invalid"
                                    : "")
                            }
                            placeholder="Username"
                            autoComplete="off"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                            Username already exists
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className={
                                "form-control" +
                                (this.state.error === DUPLICATE_EMAIL
                                    ? " is-invalid"
                                    : "")
                            }
                            placeholder="Email"
                            autoComplete="off"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-feedback">
                            Email already exists
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-fill btn-block">
                        Submit
                    </button>
                    <Link to="/signin">Already have an account?</Link>
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
