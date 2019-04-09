import React from "react"
import { Field, reduxForm } from "redux-form"
import GoogleAuth from "./GoogleAuth"

class AuthForm extends React.Component {
    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    }

    renderUserInput = ({ input, label }) => {
        return (
            <div className="form-group">
                <label>{label}</label>
                <input
                    {...input}
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    autoComplete="off"
                />
            </div>
        )
    }

    renderPasswordInput = ({ input, label }) => {
        return (
            <div className="form-group">
                <label>{label}</label>
                <input
                    {...input}
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    autoComplete="off"
                />
            </div>
        )
    }

    render() {
        return (
            <form
                className="container"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field
                    name="username"
                    component={this.renderUserInput}
                    label="Username"
                />
                <Field
                    name="password"
                    component={this.renderPasswordInput}
                    label="Password"
                />
                <GoogleAuth />
                <button className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: "authForm"
})(AuthForm)
