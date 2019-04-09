import React from "react"
import FacebookLogin from "react-facebook-login"

class FacebookAuth extends React.Component {
    handleResponse = res => {
        console.log(res)
    }

    render() {
        return (
            <FacebookLogin
                appId="651939408578120"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.handleResponse}
            />
        )
    }
}

export default FacebookAuth
