import * as Vibrant from "node-vibrant"
import React, { PureComponent } from "react"
import { withRouter } from "react-router-dom"
import Placeholder from "../../static/Placeholder.png"

class ProjectItem extends PureComponent {
    state = {
        backgroundColor: "#eeeeee"
    }

    componentDidMount() {
        if (this.props.project)
            Vibrant.from(this.props.project.icon)
                .getPalette()
                .then(pallete => pallete.LightVibrant._rgb.join(","))
                .then(color =>
                    this.setState({ backgroundColor: `rgba(${color},0.5)` })
                )
    }

    renderProject = () => {
        const {
            project: {
                name = "Test Project",
                headline = "This is a very cool project. Check it out!",
                icon = Placeholder
            } = {},
            size
        } = this.props
        const { backgroundColor } = this.state
        if (size === "small")
            return (
                <div
                    onClick={this.handleClick}
                    className="col-sm-6 col-md-12 col-lg-6 mb-4">
                    <div className="project-item__small">
                        <img
                            className="project-item__image"
                            src={icon}
                            alt="Project"
                        />
                        <div className="project-item__body">
                            <p className="project-item__title">{name}</p>
                            <p className="project-item__text">{headline}</p>
                        </div>
                    </div>
                </div>
            )
        else if (size === "large")
            return (
                <div
                    onClick={this.handleClick}
                    className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="project-item">
                        <div
                            style={{ backgroundColor }}
                            className="project-item__image__background">
                            <img
                                className="project-item__image"
                                src={icon}
                                alt="Project"
                            />
                        </div>
                        <div className="project-item__body">
                            <p className="project-item__title">{name}</p>
                            <p className="project-item__text">{headline}</p>
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <div
                    onClick={this.handleClick}
                    className="col-lg-4 col-sm-6 mb-4">
                    <div className="project-item">
                        <div
                            style={{ backgroundColor }}
                            className="project-item__image__background">
                            <img
                                className="project-item__image"
                                src={icon}
                                alt="Project"
                            />
                        </div>
                        <div className="project-item__body">
                            <p className="project-item__title">{name}</p>
                            <p className="project-item__text">{headline}</p>
                        </div>
                    </div>
                </div>
            )
    }

    handleClick = () => {
        const { _id, name, headline, icon } = this.props.project
        if (_id)
            this.props.history.push(`/projects/${_id}`, {
                name,
                headline,
                icon
            })
    }

    render() {
        return this.renderProject()
    }
}

export default withRouter(ProjectItem)
