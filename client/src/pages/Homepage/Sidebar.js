import React, { Component } from "react"
import api from "../../libs/api"
import { withRouter } from "react-router-dom"

class Sidebar extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        api("get", "/categories").then(({ categories }) =>
            this.setState({ categories })
        )
    }

    handleClick = ({ id }) => {
        this.props.history.push(`/categories/${id}`)
    }

    render() {
        return (
            <div>
                <h3>Categories</h3>
                <ul id="sidebar" className="sidebar collapse">
                    {this.state.categories.map(cate => (
                        <li
                            key={cate.id}
                            className="sidebar-item"
                            onClick={() => this.handleClick(cate)}>
                            {cate.name}
                            <img src={cate.photo} alt="" />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default withRouter(Sidebar)
