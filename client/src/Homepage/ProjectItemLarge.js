import React from "react"

const ProjectItemLarge = ({
    result: { name, description, icon = "" } = {}
}) => {
    return (
        <div className="col-md-6 mb-4">
            <div className="card project-item">
                <img src={icon} className="card-img-top" alt="Project" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectItemLarge
