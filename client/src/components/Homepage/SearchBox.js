import React, { Component } from "react"

class SearchBox extends Component {
    state = {
        query: "",
        options: [],
        selectedOptions: [],
        display: true
    }

    timeout = null

    componentDidMount() {
        window.addEventListener("click", this.hideSearch)
    }

    handleChange = e => {
        const text = e.target.value
        this.setState({ query: text })
        if (text.length === 0) this.setState({ options: [] })
        else
            this.timeout = setTimeout(() => {
                if (this.state.query === text)
                    this.props.loadOptions(text).then(options =>
                        this.setState({
                            options,
                            display: true
                        })
                    )
            }, 300)
    }

    hideSearch = () => {
        this.setState({ display: false })
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
        window.removeEventListener("click", this.hideSearch)
    }

    renderInput = () => {
        const { query } = this.state
        if (this.props.isMulti)
            return (
                <div className="form-control searchbox">
                    {this.props.selectedOptions.length > 0 && (
                        <ul className="searchbox-options">
                            {this.props.selectedOptions.map(
                                o => (
                                    <li
                                        key={this.props.optionKey(o)}
                                        className="searchbox-option">
                                        <span>{this.props.optionLabel(o)}</span>
                                        <img
                                            src={this.props.optionImg(o)}
                                            alt="Icon"
                                        />
                                        <i
                                            className="fas fa-times"
                                            onClick={() =>
                                                this.props.onUnselect(o)
                                            }
                                        />
                                    </li>
                                ),
                                this
                            )}
                        </ul>
                    )}
                    <input
                        type="text"
                        autoComplete="off"
                        className="searchbox-input"
                        placeholder={this.props.placeholder}
                        value={query}
                        onChange={this.handleChange}
                    />
                </div>
            )
        else
            return (
                <input
                    type="text"
                    autoComplete="off"
                    className="form-control searchbox"
                    placeholder={this.props.placeholder}
                    value={query}
                    onChange={this.handleChange}
                />
            )
    }

    render() {
        const { options, display } = this.state
        return (
            <div className="dropdown">
                {this.renderInput()}
                <ul
                    style={{
                        display:
                            display && options.length > 0 ? "block" : "none"
                    }}
                    className="dropdown-menu w-100">
                    {this.state.options.map(o => (
                        <li
                            key={this.props.optionKey(o)}
                            className="dropdown-item"
                            onClick={() => {
                                this.setState({ query: "" })
                                this.props.onSelect(o)
                            }}>
                            {this.props.optionLabel(o)}
                            <img src={this.props.optionImg(o)} alt="Icon" />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchBox
