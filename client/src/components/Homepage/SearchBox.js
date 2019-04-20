import React, { Component } from "react"
import api from "../../libs/api"

class SearchBox extends Component {
    state = {
        query: "",
        results: [],
        display: true
    }

    timeout = null

    componentDidMount() {
        window.addEventListener("click", this.hideSearch)
    }

    getInfo = () => {
        api("get", `/projects/search?q=${this.state.query}`).then(
            ({ projects }) =>
                this.setState({
                    results: projects,
                    display: true
                })
        )
    }

    handleChange = e => {
        const text = e.target.value
        this.setState({ query: text })
        if (text.length === 0) this.setState({ results: [] })
        else
            this.timeout = setTimeout(() => {
                if (this.state.query === text) this.getInfo()
            }, 200)
    }

    hideSearch = () => {
        this.setState({ display: false })
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
        window.removeEventListener("click", this.hideSearch)
    }

    render() {
        const { query, results, display } = this.state
        return (
            <div className="dropdown">
                <input
                    type="text"
                    className="form-control dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    placeholder="Search Projects"
                    autoComplete="off"
                    value={query}
                    onChange={this.handleChange}
                />
                <ul
                    style={{
                        display:
                            display && results.length > 0 ? "block" : "none"
                    }}
                    className="dropdown-menu w-100">
                    {this.state.results.map(project => (
                        <li key={project._id} className="dropdown-item">
                            {project.name}
                            <img src={project.icon} alt="Icon" />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchBox
