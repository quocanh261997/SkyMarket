import React, { Component } from "react"
import Landing from "../static/Landing.png"
import ProjectItemLarge from "./ProjectItemLarge"
import ProjectItemSmall from "./ProjectItemSmall"
import Sidebar from "./Sidebar"
import SearchBox from "./SearchBox"

class Homepage extends Component {
    render() {
        return (
            <div>
                <div className="homepage-header">
                    <div className="homepage-header__background">
                        <div className="container row">
                            <div className="col-md-6 homepage-header__search">
                                <h2 style={{ color: "white" }}>
                                    Showcase your projects with SkyMarket
                                </h2>
                                <SearchBox />
                            </div>
                            <div className="col-md-6 text-center">
                                <img
                                    className="homepage-header__image"
                                    src={Landing}
                                    alt="Landing Image"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container row mx-auto">
                    <div className="col-md-4 mt-4">
                        <Sidebar />
                    </div>
                    <div className="col-md-8 mt-4">
                        <h4>Featured Projects</h4>
                        <div className="row">
                            {[...Array(4)].map(() => (
                                <ProjectItemLarge />
                            ))}
                        </div>
                        <h4>Trending Projects</h4>
                        <div className="row">
                            {[...Array(4)].map(() => (
                                <ProjectItemSmall />
                            ))}
                        </div>
                        <h4>Recent Projects</h4>
                        <div className="row">
                            {[...Array(4)].map(() => (
                                <ProjectItemSmall />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage
