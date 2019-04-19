import React from "react"
import api from "../../libs/api"
import { isNull } from "util"

class Upload extends React.Component {
    state = {
        name: "",
        headline: "",
        description: "",
        userName: "",
        categoryName: "",
        userResult: [],
        categoryResult: [],
        developers: [],
        categories: [],
        externals: []
    }

    userTimeout = null
    categoryTimeout = null

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleUserChange = e => {
        const user = e.target.value
        this.setState({ userName: user })
        if (user.length === 0) this.setState({ userResult: [] })
        else {
            this.userTimeout = setTimeout(() => {
                if (this.state.userName === user) this.getUsers()
            }, 200)
        }
    }

    handleCategoryChange = e => {
        const category = e.target.value
        this.setState({ categoryName: category })
        if (category.length === 0) this.setState({ categoryResult: [] })
        else {
            this.categoryTimeout = setTimeout(() => {
                if (this.state.categoryName === category) this.getCategories()
            }, 200)
        }
    }

    getUsers = () => {
        api("get", `search/user?q=${this.state.userName}`).then(({ users }) => {
            this.setState({
                userResult: users
            })
        })
    }

    getCategories = () => {
        api("get", `search/cateogyr?q=${this.state.categoryName}`).then(
            ({ categories }) => {
                this.setState({
                    categoryResult: categories
                })
            }
        )
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <h2 style={{ marginBottom: "1em" }}>Project Upload</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            maxLength={20}
                            className="form-control"
                            placeholder="Name of Project"
                            autoComplete="off"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="headline"
                            maxLength={50}
                            className="form-control"
                            placeholder="Headline of Project"
                            autoComplete="off"
                            value={this.state.headline}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Description of Project"
                            autoComplete="off"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group dropdown">
                        <input
                            type="text"
                            id="searchDropdown"
                            className="form-control dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            placeholder="Search Developers"
                            autoComplete="off"
                            value={this.state.userName}
                            onChange={this.handleUserChange}
                        />
                    </div>
                    <div className="form-group dropdown">
                        <input
                            type="text"
                            id="searchDropdown"
                            className="form-control dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            placeholder="Search Category"
                            autoComplete="off"
                            value={this.state.categoryName}
                            onChange={this.handleCategoryChange}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Upload
