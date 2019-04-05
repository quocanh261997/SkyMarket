import React from "react"

const Suggestion = props => {
    const options = props.results.map(res => {
        return <li key={res._id}>{res.name}</li>
    })
    return <ul>{options}</ul>
}

export default Suggestion
