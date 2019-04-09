import React from "react"

const ProjectItemLarge = () => {
    return (
        <div className="col-lg-4 col-sm-6 mb-4">
            <div className="project-item">
                <img
                    className="project-item__image"
                    src="https://dummyimage.com/300x200"
                    alt="Project"
                />
                <div className="project-item__body">
                    <p className="project-item__title">Project #0</p>
                    <p className="project-item__text">Lorem ipsum</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectItemLarge
