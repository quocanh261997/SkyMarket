import * as Vibrant from "node-vibrant"
import React, { Component } from "react"
import api from "../../libs/api"

class Project extends Component {
    state = {
        name: "",
        icon: "",
        photos: [],
        headline: "",
        description: "",
        categories: [],
        backgroundColor: ""
    }

    componentDidMount() {
        let id = this.props.match.params.id
        api("get", `/projects/${id}`)
            .then(({ project }) => this.setState(project))
            .then(() =>
                Vibrant.from(this.state.icon)
                    .getPalette()
                    .then(pallete => pallete.LightVibrant._rgb.join(","))
                    .then(color =>
                        this.setState({ backgroundColor: `rgba(${color},0.5)` })
                    )
            )
    }

    render() {
        const {
            name,
            icon,
            photos,
            headline,
            description,
            categories,
            backgroundColor
        } = this.state
        return (
            <div className="container m-auto">
                <button
                    className="btn btn-outline"
                    onClick={() => this.props.history.goBack()}>
                    Back
                </button>
                <div className="row">
                    <div className="col-lg-3 col-md-4 text-center">
                        <div
                            style={{
                                width: 150,
                                height: 150,
                                margin: "1em auto",
                                backgroundColor,
                                borderRadius: "0.8em",
                                padding: "1em"
                            }}>
                            <img
                                style={{
                                    height: 100,
                                    width: 100
                                }}
                                src={icon}
                                alt=""
                            />
                        </div>
                        <div className="sidebar">
                            {categories.map(cat => (
                                <div
                                    className="sidebar-item"
                                    key={cat._id}
                                    onClick={() =>
                                        this.props.history.push(
                                            `/categories/${cat._id}`
                                        )
                                    }>
                                    <span>{cat.name}</span>
                                    <img src={cat.photo} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <h2>{name}</h2>
                        <p style={{ fontSize: "large" }}>{headline}</p>
                        <p style={{ marginTop: "2em", textAlign: "justify" }}>
                            {description}
                        </p>
                        <div className="row">
                            {photos.map((url, i) => (
                                <div key={i} className="col-lg-6 mb-4">
                                    <img
                                        className="img-fluid"
                                        src="http://dummyimage.com/720x450.jpg"
                                        alt=""
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
