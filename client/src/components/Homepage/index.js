import React, { Component } from "react"
import api from "../../libs/api"
import Landing from "../../static/Landing.png"
import ProjectItemLarge from "./ProjectItemLarge"
import ProjectItemSmall from "./ProjectItemSmall"
import SearchBox from "./SearchBox"
import Sidebar from "./Sidebar"

class Homepage extends Component {
    state = {
        featured: [...Array(6)],
        trending: [...Array(6)],
        recent: [...Array(6)]
    }

    componentDidMount() {
        api.get("/").then(response => {
            this.setState({
                ...response.data
            })
        })
    }

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
                                    alt="Landing"
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
