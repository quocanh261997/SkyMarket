import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../../libs/api"
import ProjectItem from "../components/ProjectItem"

class Category extends Component {
    state = {
        id: null,
        name: "",
        photo: "",
        projects: [...Array(6)]
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.setState({ id })
        api("get", `/categories/${id}`).then(({ name, photo, projects }) =>
            this.setState({ name, photo, projects })
        )
    }

    nextClick = () => {
        console.log(this.state.projects.length)
        api(
            "get",
            `/categories/${this.state.id}?offset=${this.state.projects.length}`
        ).then(({ name, photo, projects }) => {
            console.log(projects)
            this.setState(prev => ({
                name,
                photo,
                projects: [...prev.projects, ...projects]
            }))
        })
    }

    render() {
        return (
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "1em 0 1em 0"
                    }}
                >
                    <button
                        className="btn btn-outline"
                        onClick={() => this.props.history.goBack()}
                    >
                        Back
                    </button>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <h3 style={{ margin: 0 }}>{this.state.name}</h3>
                        <img
                            style={{ width: 35, marginLeft: 10 }}
                            src={this.state.photo}
                            alt=""
                        />
                    </div>
                </div>
                <div className="row mx-auto">
                    {this.state.projects.map((p, i) => (
                        <ProjectItem
                            key={p ? p._id : i}
                            project={p}
                            size="large"
                        />
                    ))}
                </div>
                <div className="container">
                    <button>Previous</button>
                    <button onClick={this.nextClick}>Next</button>
                </div>
            </div>
        )
    }
}

export default Category
