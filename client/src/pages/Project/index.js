import React, { Component } from "react"
import api from "../../libs/api"

class Project extends Component {
    state = {
        name: "",
        headline: "",
        icon: "",
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
        return (
            <div className="container m-auto">
                <button
                    className="btn btn-outline"
                    onClick={() => this.props.history.goBack()}>
                    Back
                </button>
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 50
                            }}
                            src={this.state.icon}
                            alt="Icon"
                        />
                        <ul id="sidebar" className="list-group collapse">
                            {this.state.categories.map(cat => (
                                <li
                                    key={cat._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                    className="list-group-item sidebar-item"
                                    onClick={() => {}}>
                                    {cat.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-8">
                        <h2>{this.state.name}</h2>
                        <p>{this.state.headline}</p>
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
