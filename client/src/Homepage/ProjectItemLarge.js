import React from "react"

const ProjectItemLarge = () => {
    return (
        <div className="col-md-6 mb-4">
            <div className="card project-item">
                <img
                    src="https://dummyimage.com/300x200"
                    className="card-img-top"
                    alt="Project"
                />
                <div className="card-body">
                    <h5 className="card-title">Project #0</h5>
                    <p className="card-text">Lorem ipsum</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectItemLarge
