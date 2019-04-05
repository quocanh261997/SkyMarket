import React, { Component } from "react"

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

    handleChange = e => {
        const text = e.target.value
        this.setState({ q: text })
        if (text.length === 0) this.setState({ results: [] })
        else
            this.timeout = setTimeout(() => {
                if (this.state.q === text)
                    this.setState({
                        results: [...Array(5)].map(Math.random),
                        display: true
                    })
            }, 500)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { q, results, display } = this.state
        return (
            <div className="dropdown">
                <input
                    type="text"
                    className="form-control dropdown-toggle"
                    id="searchDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    value={q}
                    onChange={this.handleChange}
                />
                <ul
                    style={{
                        display:
                            display && results.length > 0 ? "block" : "none"
                    }}
                    className="dropdown-menu w-100"
                    aria-labelledby="searchDropdown">
                    {this.state.results.map(i => (
                        <li className="dropdown-item">{i}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchBox
