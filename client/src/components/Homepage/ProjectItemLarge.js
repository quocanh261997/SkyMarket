import React from "react"

const ProjectItemLarge = ({
    result: {
        name = "Test Project",
        headline = "This is a very cool project. Check it out!",
        icon = "https://dummyimage.com/300x200"
    } = {}
}) => {
    return (
        <div className="col-lg-4 col-sm-6 mb-4">
            <div className="project-item">
                <div className="project-item__image">
                    <img
                        className="project-item__small__image"
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

export default ProjectItemLarge
