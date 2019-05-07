import * as Vibrant from "node-vibrant"
import React, { Component } from "react"
import api from "../../libs/api"
import ProjectItem from "../components/ProjectItem"

class User extends Component {
    state = {
        id: null,
        username: "",
        email: "",
        photo: "",
        projects: [...Array(6)],
        backgroundColor: "#eeeeee"
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.getProjects()
    }

    componentDidMount() {
        this.getProjects()
    }

    getProjects = () => {
        let id = this.props.match.params.id
        this.setState({ id })
        api("get", `/projects?user=${id}`)
            .then(({ username, email, photo, projects }) =>
                this.setState({
                    username,
                    email,
                    photo,
                    projects,
                    backgroundColor: "#eeeeee"
                })
            )
            .then(() =>
                Vibrant.from(this.state.photo)
                    .getPalette()
                    .then(pallete => pallete.LightVibrant._rgb.join(","))
                    .then(color =>
                        this.setState({ backgroundColor: `rgba(${color},0.5)` })
                    )
            )
    }

    render() {
        const { username, email, photo, projects, backgroundColor } = this.state
        return (
            <div className="container m-auto">
                <div className="row">
                    <div className="col-lg-3 text-center mt-1">
                        <div
                            className="icon-container-center"
                            style={{
                                backgroundColor
                            }}>
                            <img style={{ width: 100 }} src={photo} alt="" />
                        </div>
                        <div className="sidebar">
                            <h4>{username}</h4>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className=" col-lg-9 my-4">
                        <h2>{username}'s projects</h2>
                        <div className="row">
                            {projects.map((p, i) => (
                                <ProjectItem
                                    key={p ? p._id : i}
                                    project={p}
                                    size="large"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User
