import React, { useState } from "react"

const Sidebar = () => {
    const [category, setCategory] = useState("")

    return (
        <ul className="list-group">
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
