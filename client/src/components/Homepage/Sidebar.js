import React, { Component } from "react"
import api from "../../libs/api"
import { withRouter } from "react-router-dom"

class Sidebar extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        api("get", "categories").then(({ categories }) =>
            this.setState({ categories })
        )
    }

    handleClick = ({ _id, name, photo }) => {
        this.props.history.push(`/categories/${_id}`, {
            name,
            photo
        })
    }

    render() {
        return (
            <div>
                <h3>Categories</h3>
                <ul id="sidebar" className="list-group collapse">
                    {this.state.categories.length > 0 &&
                        this.state.categories.map(cate => (
                            <li
                                key={cate._id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                                className="list-group-item sidebar-item"
                                onClick={() => this.handleClick(cate)}>
                                {cate.name}
                                <img
                                    style={{ width: 30 }}
                                    src={cate.photo}
                                    alt="Category"
                                />
                            </li>
                        ))}
                </ul>
            </div>
        )
    }
}

export default withRouter(Sidebar)
