import React, { Component } from "react"
import api from "../../libs/api"
import ProjectItem from "../Homepage/ProjectItem"

class Category extends Component {
    state = {
        projects: []
    }

    componentDidMount() {
        let id = this.props.match.params.id
        api("get", `/categories/${id}`).then(({ projects }) =>
            this.setState({ projects })
        )
    }

    render() {
        const name = this.props.location.state.name,
            photo = this.props.location.state.photo
        return (
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "1em",
                        marginBottom: "1em"
                    }}>
                    <h3 style={{ margin: 0 }}>{name}</h3>
                    <img
                        style={{ width: 35, marginLeft: 10 }}
                        src={photo}
                        alt="Category"
                    />
                </div>
                <div className="row mx-auto">
                    {this.state.projects.map((project, index) => (
                        <ProjectItem
                            key={project ? project._id : index}
                            project={project}
                            size="large"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Category
