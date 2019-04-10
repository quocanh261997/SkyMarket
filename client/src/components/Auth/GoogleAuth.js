import React from "react"
import GoogleLogin from "react-google-login"
import { withRouter } from "react-router-dom"

class GoogleAuth extends React.Component {
    onLoginSuccess = res => {
        console.log(res)
        this.props.history.push("/")
    }

    onLoginFailure = err => {
        console.log(err)
    }

    render() {
        return (
            <GoogleLogin
                clientId="111720795348-fqd90g07qn24cclnej78c3r5e8lt5i0r.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.onLoginSuccess}
                onFailure={this.onLoginFailure}
            />
        )
    }
}

export default withRouter(GoogleAuth)
