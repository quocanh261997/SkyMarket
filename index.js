require("dotenv").config()
const PORT = 5000 || process.env.PORT

const app = require("express")(),
    db = require("./models"),
    bodyParser = require("body-parser"),
    jwt = require("jsonwebtoken"),
    cors = require("cors")

app.use(bodyParser.json())
app.use(cors())

/**
 * @returns
 *      4 random featured apps
 *      8 trending apps
 *      8 recently added
 *      All categories
 */

// Getting the apps for homepage
app.get("/", async (req, res) => {
    const featured = await db.Project.aggregate([
        { $sample: { size: 4 } },
        { $project: { name: 1, description: 1, icon: 1 } }
    ])
    const trending = await db.Project.find({}, "name description icon")
        .sort({ views: -1 })
        .limit(8)
    const recent = await db.Project.find({}, "name description icon")
        .sort({ createdAt: -1 })
        .limit(8)
    res.json({
        featured,
        trending,
        recent
    })
})

// Getting the list of projects that have the queried category
app.get("/category/:c", async (req, res) => {
    const c = req.params.c.split(",")
    const projects = await db.Project.find({
        categories: { $all: c }
    })
    res.json({
        projects
    })
})

// Getting the list of projects based on queried name
app.get("/search", async (req, res) => {
    const q = req.query.q
    const projects = await db.Project.find({
        name: { $regex: q, $options: "i" }
    }).limit(5)
    res.json({
        projects
    })
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    db.User.create({
        username,
        password,
        photo:
            "https://www.own3d.tv/wp-content/uploads/2018/01/Avatar-Maker-Overfl%C3%A4che.jpg"
    })
        .then(({ photo }) => {
            let token = jwt.sign({ username }, process.env.SECRET_KEY)
            res.status(201).json({ username, photo, token })
        })
        .catch(({ code }) => {
            if (code === 11000)
                res.status(400).json({
                    message: "Duplicate username"
                })
            else
                res.status(500).json({
                    message: "Internal error"
                })
        })
})

app.post("/signin", async (req, res, next) => {
    const { username, password } = req.body
    try {
        let user = await db.User.findOne({
            username
        })
        let { photo } = user
        let isMatch = await user.comparePassword(password)
        if (isMatch) {
            let token = jwt.sign({ username }, process.env.SECRET_KEY)
            res.status(200).json({ username, photo, token })
        } else {
            return next({
                status: 400,
                message: "Incorrect password"
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Incorrect username"
        })
    }
})

app.use((error, req, res) => {
    res.status(error.status).json({ message: error.message })
})

app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
})
