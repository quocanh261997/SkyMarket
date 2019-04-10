import React, { useState } from "react"

const Sidebar = () => {
    const [category, setCategory] = useState("")

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
                    key={c}
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
