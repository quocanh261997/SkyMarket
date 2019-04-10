import React, { Component } from "react"
import { connect } from "react-redux"
import Login from "./Login"
import SignUp from "./SignUp"

class SignIn extends Component {
    render() {
        return (
            <div className="container">
                <SignUp />
            </div>
        )
    }
}

export default connect(
    () => ({}),
    {}
)(SignIn)
