import React, { Component } from "react"
import api from "../../libs/api"
import ProjectItem from "../components/ProjectItem"

class Admin extends Component {
    state = {
        id: null,
        username: "",
        email: "",
        photo: "",
        projects: [...Array(6)]
    }

    componentDidMount() {
        this.getProjects()
    }

    //Get all the uploaded projects
    getProjects = () => {
        let id = this.props.match.params.id
        this.setState({ id })
        api("get", "/admin").then(({ projects }) => {
            this.setState({ projects })
        })
    }

    //Decide if a project is to be accepted or rejected
    decideProject = (id, confirmed) => {
        api("put", `/admin/${id}`, {
            confirmed: confirmed
        }).then(() => {
            this.setState(prevState => ({
                projects: prevState.projects.filter(
                    project => project._id !== id
                )
            }))
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.projects.map((p, i) => (
                        <ProjectItem
                            key={p ? p._id : i}
                            project={p}
                            size="lage"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Admin
