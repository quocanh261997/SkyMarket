import React from "react"
import db from "../db"
import _ from "lodash"
import Suggestion from "./Suggestion"

class SearchBox extends React.Component {
    state = {
        query: "",
        results: []
    }

    getInfo = async () => {
        const response = await db.get(`/search?q=${this.state.query}`)
        console.log(response)

        this.setState({
            results: response.data.projects
        })
    }

    handleInputChange = () => {
        this.setState(
            {
                query: this.search.value
            },
            () => {}
        )
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Project's name"
                    ref={input => (this.search = input)}
                    onChange={this.handleInputChange}
                />
                <Suggestion results={this.state.results} />
            </form>
        )
    }
}

export default SearchBox
