import React, { useState } from "react"

const Sidebar = props => {
    const [category, setCategory] = useState("")
    console.log(props.show)

    return (
        <ul id="sidebar" className="list-group collapse">
            {[
                "Terminal",
                "Productivity",
                "Compiler",
                "Android",
                "iOS",
                "Backend",
                "Frontend"
            ].map(c => (
                <li
                    className={
                        "list-group-item sidebar-item" +
                        (category === c ? " sidebar-item__selected" : "")
                    }
                    onClick={() => setCategory(c)}>
                    {c}
                </li>
            ))}
        </ul>
    )
}

export default Sidebar
