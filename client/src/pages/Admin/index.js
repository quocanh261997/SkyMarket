import React, { Component } from "react"
import api from "../../libs/api"

class Admin extends Component {
    state = {
        id: null,
        projects: [...Array(3)]
    }

    componentDidMount() {
        setTimeout(() => this.getProjects(), 50)
    }

    //Get all the uploaded projects
    getProjects = () => {
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

    renderProjectItem = (p = {}) => {
        const {
            name = "Awesome Project",
            headline = "This is a very cool project. Check it out!",
            icon
        } = p
        return (
            <div key={p._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="project-item">
                    <div className="project-item__image__background">
                        <img
                            className="project-item__image"
                            src={icon}
                            alt=""
                        />
                    </div>
                    <div className="project-item__body">
                        <p className="project-item__title">{name}</p>
                        <p className="project-item__text">{headline}</p>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: "1em",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <button
                        className="btn btn-outline-success"
                        style={{ width: "49%" }}
                        onClick={() => this.decideProject(p._id, true)}>
                        Accept
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        style={{ width: "49%" }}
                        onClick={() => this.decideProject(p._id, false)}>
                        Reject
                    </button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row m-auto">
                    {this.state.projects.map(p => this.renderProjectItem(p))}
                </div>
            </div>
        )
    }
}

export default Admin
