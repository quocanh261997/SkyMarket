import React, { Component } from "react"
import api from "../../libs/api"
import Landing from "../../static/Landing.png"
import ProjectItem from "../components/ProjectItem"
import SearchBox from "../components/SearchBox"
import Sidebar from "./Sidebar"

class Homepage extends Component {
    state = {
        featured: [...Array(6)],
        trending: [...Array(6)],
        recent: [...Array(6)]
    }

    componentDidMount() {
        api("get", "/projects").then(data => {
            this.setState({
                ...data
            })
        })
    }

    getProjects = query => {
        return api("get", `/projects/search?q=${query}`).then(
            ({ projects }) => projects
        )
    }

    render() {
        return (
            <section>
                <div className="homepage-header">
                    <div className="homepage-header__background">
                        <div className="container row">
                            <div className="col-md-6 homepage-header__search">
                                <h2>Showcase your projects with SkyMarket</h2>
                                <SearchBox
                                    loadOptions={this.getProjects}
                                    optionKey={o => o._id}
                                    optionLabel={o => o.name}
                                    optionImg={o => o.icon}
                                    placeholder="Search Projects"
                                    onSelect={({ _id }) => {
                                        this.props.history.push(
                                            `/projects/${_id}`
                                        )
                                    }}
                                />
                            </div>
                            <div className="col-md-6 homepage-header__image">
                                <img src={Landing} alt="" />
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
                            {this.state.featured.map((project, index) => (
                                <ProjectItem
                                    key={project ? project._id : index}
                                    project={project}
                                />
                            ))}
                        </div>
                        <h4>Trending Projects</h4>
                        <div className="row">
                            {this.state.trending.map((project, index) => (
                                <ProjectItem
                                    key={project ? project._id : index}
                                    project={project}
                                    size="small"
                                />
                            ))}
                        </div>
                        <h4>Recent Projects</h4>
                        <div className="row">
                            {this.state.recent.map((project, index) => (
                                <ProjectItem
                                    key={project ? project._id : index}
                                    project={project}
                                    size="small"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Homepage
