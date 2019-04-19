import React, { Component } from "react"
import api from "../../libs/api"

class SearchBox extends Component {
    state = {
        q: "",
        results: [],
        display: true
    }

    timeout = null

    componentDidMount() {
        window.addEventListener("click", () => {
            this.setState({ display: false })
        })
    }

    getInfo = () => {
        api("get", `/project/search?q=${this.state.q}`).then(({ projects }) =>
            this.setState({
                results: projects,
                display: true
            })
        )
    }

    handleChange = e => {
        const text = e.target.value
        this.setState({ q: text })
        if (text.length === 0) this.setState({ results: [] })
        else
            this.timeout = setTimeout(() => {
                if (this.state.q === text) this.getInfo()
            }, 200)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { q, results, display } = this.state
        return (
            <div className="dropdown">
                <input
                    id="searchDropdown"
                    type="text"
                    className="form-control dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    placeholder="Search Projects"
                    autoComplete="off"
                    value={q}
                    onChange={this.handleChange}
                />
                <ul
                    style={{
                        display:
                            display && results.length > 0 ? "block" : "none"
                    }}
                    className="dropdown-menu w-100"
                >
                    {this.state.results.map(i => (
                        <li
                            className="dropdown-item"
                            style={{
                                padding: "10px 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            {i.name}
                            <img
                                style={{ width: 25 }}
                                src={i.icon}
                                alt="Icon"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchBox
