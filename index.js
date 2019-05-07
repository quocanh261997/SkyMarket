require("dotenv").config()
const PORT = process.env.PORT || 8080
const express = require("express"),
    app = express(),
    cors = require("cors"),
    path = require("path"),
    bodyParser = require("body-parser"),
    routes = require("./routes")

app.use(bodyParser.json())
app.use(cors())

app.use("/api/users", routes.userRoute)
app.use("/api/admin", routes.adminRoute)
app.use("/api/projects", routes.projectRoute)
app.use("/api/categories", routes.categoryRoute)

app.use(function(err, _, res, _) {
    console.log(err)

    res.status(err.status || 500).json({
        type: err.type || "INTERNAL_ERROR"
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", function(_, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"))
    })
}

app.listen(PORT, () => console.log(`Node listening on port ${PORT}`))
