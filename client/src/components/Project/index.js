import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../../libs/api"

class Project extends Component {
    state = {
        photos: [],
        categories: []
    }

    componentDidMount() {
        let id = this.props.match.params.id
        api("get", `/projects/${id}`).then(({ project }) =>
            this.setState(project)
        )
    }

    render() {
        const name = this.props.location.state.name,
            headline = this.props.location.state.headline,
            icon = this.props.location.state.icon,
            lastPage = this.props.location.state.lastPage

        return (
            <div className="container m-auto">
                <Link to={lastPage}>Back</Link>
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 50
                            }}
                            src={icon}
                            alt="Icon"
                        />
                        <ul id="sidebar" className="list-group collapse">
                            {this.state.categories.map(cate => (
                                <li
                                    key={cate._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                    className="list-group-item sidebar-item"
                                    onClick={() => {}}>
                                    {cate.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-8">
                        <h2>{name}</h2>
                        <p>{headline}</p>
                        <p style={{ marginTop: "2em", textAlign: "justify" }}>
                            {this.state.description}
                        </p>
                        <div className="row">
                            {this.state.photos.map((url, index) => (
                                <div className="col-lg-6 mb-4">
                                    <img
                                        className="img-fluid"
                                        key={index}
                                        src={url}
                                        alt="Project"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Project
