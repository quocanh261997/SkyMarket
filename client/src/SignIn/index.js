import React, { Component } from "react"
import { signIn, signUp } from "../actions"
import { connect } from "react-redux"
import AuthForm from "./AuthForm"

class SignIn extends Component {
    renderStatus() {
        if (!this.props.auth) {
            return <h1>Loading</h1>
        } else if (!this.props.auth.isSignedIn) {
            return <h1>Not logged in</h1>
        } else {
            return <h1>{this.props.auth.username}</h1>
        }
    }

    onSubmit = ({ username, password }) => {
        this.props.signIn(username, password)
    }

    render() {
        return <AuthForm onSubmit={this.onSubmit} />
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(
    mapStateToProps,
    { signIn, signUp }
)(SignIn)
