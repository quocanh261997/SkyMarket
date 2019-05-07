import * as Vibrant from "node-vibrant"
import React, { Component } from "react"
import { connect } from "react-redux"
import api from "../../libs/api"
import { starProject } from "../../libs/redux/actions"

class Project extends Component {
    state = {
        id: "",
        name: "",
        icon: "",
        stars: 0,
        photos: [],
        headline: "",
        description: "",
        categories: [],
        developers: [],
        reviews: [],
        backgroundColor: "",
        review: "",
        posting: false
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.setState({ id })
        api("get", `/projects/${id}`)
            .then(({ project }) => this.setState(project))
            .then(this.getReviews)
            .then(() =>
                Vibrant.from(this.state.icon)
                    .getPalette()
                    .then(pallete => pallete.LightVibrant._rgb.join(","))
                    .then(color =>
                        this.setState({ backgroundColor: `rgba(${color},0.5)` })
                    )
            )
    }

    getReviews = () => {
        api("get", `/projects/${this.state.id}/reviews`).then(({ reviews }) =>
            this.setState({ reviews })
        )
    }

    postReview = e => {
        e.preventDefault()
        this.setState({ posting: true })
        api("post", `/projects/${this.state.id}/reviews`, {
            content: this.state.review
        }).then(({ review }) =>
            this.setState(prev => ({
                reviews: [review, ...prev.reviews],
                review: "",
                posting: false
            }))
        )
    }

    render() {
        const {
            name,
            icon,
            stars,
            photos,
            headline,
            description,
            categories,
            developers,
            reviews,
            backgroundColor,
            review,
            posting
        } = this.state
        return (
            <div className="container my-4">
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
                            <img style={{ width: 100 }} src={icon} alt="" />
                        </div>
                        <div
                            style={{ justifyContent: "center" }}
                            className="searchbox-options">
                            {developers.map(d => (
                                <div
                                    className="searchbox-option"
                                    key={d._id}
                                    onClick={() =>
                                        this.props.history.push(
                                            `/users/${d._id}`
                                        )
                                    }>
                                    <span>{d.username}</span>
                                    <img src={d.photo} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="sidebar">
                            {categories.map(c => (
                                <div
                                    className="sidebar-item"
                                    key={c._id}
                                    onClick={() =>
                                        this.props.history.push(
                                            `/categories/${c._id}`
                                        )
                                    }>
                                    <span>{c.name}</span>
                                    <img src={c.photo} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                            <h2>{name}</h2>
                            <button
                                className="btn btn-outline-secondary"
                                disabled={!this.props.photo}
                                onClick={() => {
                                    this.setState(prev => ({
                                        stars:
                                            prev.stars +
                                            (this.props.star ? -1 : 1)
                                    }))
                                    this.props.starProject(
                                        this.state.id,
                                        !this.props.star
                                    )
                                }}>
                                {stars + " "}
                                {this.props.star ? (
                                    <i
                                        style={{ color: "orange" }}
                                        className="fas fa-star"
                                    />
                                ) : (
                                    <i className="far fa-star" />
                                )}
                            </button>
                        </div>
                        <p style={{ fontSize: "large" }}>{headline}</p>
                        <p
                            style={{
                                marginTop: "2em",
                                textAlign: "justify"
                            }}>
                            {description}
                        </p>
                        <div className="row">
                            {photos.map((p, i) => (
                                <div key={i} className="col-lg-6 mb-4">
                                    <img className="img-fluid" src={p} alt="" />
                                </div>
                            ))}
                        </div>
                        <div>
                            {this.props.photo && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "1em"
                                    }}>
                                    <img
                                        style={{
                                            height: 40,
                                            marginRight: "1em"
                                        }}
                                        src={this.props.photo}
                                        alt=""
                                    />
                                    <form
                                        style={{ flex: 1 }}
                                        onSubmit={this.postReview}>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            placeholder="Write review"
                                            disabled={posting}
                                            value={review}
                                            onChange={e =>
                                                this.setState({
                                                    review: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </form>
                                </div>
                            )}
                            {reviews.map(r => (
                                <div
                                    key={r._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                    <img
                                        style={{
                                            height: 40,
                                            marginRight: "1em"
                                        }}
                                        src={r.author.photo}
                                        alt=""
                                    />
                                    <div>
                                        <span
                                            style={{
                                                fontWeight: "bold"
                                            }}>
                                            {r.author.username}
                                        </span>
                                        <br />
                                        <span>{r.content}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ authReducer: { photo, starProjects } }, props) => ({
        photo,
        star: starProjects.includes(props.match.params.id)
    }),
    { starProject }
)(Project)
