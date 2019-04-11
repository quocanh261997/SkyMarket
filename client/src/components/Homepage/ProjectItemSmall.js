import React from "react"

const ProjectItemSmall = ({
    result: {
        name = "Test Project",
        headline = "This is a very cool project. Check it out!",
        icon = "https://dummyimage.com/100x100"
    } = {}
}) => {
    return (
        <div className="col-sm-6 col-md-12 col-lg-6 mb-4">
            <div className="project-item__small">
                <img
                    className="project-item__small__image"
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
}

export default ProjectItemSmall
