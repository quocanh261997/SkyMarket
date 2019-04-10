import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn } from "../../libs/redux/actions"

class Login extends Component {
    state = {
        userInput: "",
        password: ""
    }

    onSignIn = e => {
        e.preventDefault()
        const { userInput, password } = this.state
        this.props.signIn(userInput, password)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSignIn}>
                    <div className="form-group">
                        <label>Username/Email</label>
                        <input
                            type="text"
                            name="userInput"
                            className="form-control"
                            placeholder="Enter username/email"
                            autoComplete="off"
                            value={this.state.userInput}
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
                        Log In
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(
    () => ({}),
    { signIn }
)(Login)
