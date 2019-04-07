import React, { Component } from "react"
import Landing from "../static/Landing.png"
import ProjectItemLarge from "./ProjectItemLarge"
import ProjectItemSmall from "./ProjectItemSmall"
import Sidebar from "./Sidebar"
import SearchBox from "./SearchBox"
import db from "../db"

class Homepage extends Component {
    state = {
        featured: [],
        trending: [],
        recent: []
    }

    componentDidMount() {
        db.get("/").then(response => {
            console.log(response.data)
            this.setState({
                ...response.data
            })
        })
    }

    render() {
        console.log(this.state.featured)

        return (
            <div>
                <div className="homepage-header">
                    <div className="homepage-header__bg">
                        <div className="container row">
                            <div className="col-md-6 homepage-header__search">
                                <h2 style={{ color: "white" }}>
                                    Showcase your projects with SkyMarket
                                </h2>
                                <SearchBox />
                            </div>
                            <div className="col-md-6 text-center">
                                <img
                                    className="homepage-header__img"
                                    src={Landing}
                                    alt="Landing Image"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container row mx-auto">
                    <div className="col-md-4 mt-5">
                        <Sidebar />
                    </div>
                    <div className="col-md-8 mt-5">
                        <h4>Featured Projects</h4>
                        <div className="row">
                            {this.state.featured.map(project => (
                                <ProjectItemLarge result={project} />
                            ))}
                        </div>
                        <h4>Trending Projects</h4>
                        <div className="row">
                            {this.state.trending.map(project => (
                                <ProjectItemSmall result={project} />
                            ))}
                        </div>
                        <h4>Recent Projects</h4>
                        <div className="row">
                            {this.state.recent.map(project => (
                                <ProjectItemSmall result={project} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage
