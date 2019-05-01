require("dotenv").config()
const PORT = process.env.PORT || 8080
const express = require("express"),
    app = express(),
    cors = require("cors"),
    path = require("path"),
    jwt = require("jsonwebtoken"),
    bodyParser = require("body-parser"),
    routes = require("./routes")

app.use(bodyParser.json())
app.use(cors())

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader)
        next({
            message: "Please login first"
        })
    const token = authHeader.split(" ")[1]
    if (token) {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)
        req._id = _id
        next()
    }
}
app.use("/api/users", routes.userRoute)
app.use("/api/categories", routes.categoryRoute)
app.use("/api/projects", routes.projectRoute)
app.use("/api/reviews", routes.reviewRoute)

app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        type: err.type || "INTERNAL_ERROR"
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"))
    })
}

app.listen(PORT, () => console.log(`Node listening on port ${PORT}`))
