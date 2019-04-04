require("dotenv").config()
const PORT = 8080 || process.env.PORT

const app = require("express")(),
    db = require("./models"),
    bodyParser = require("body-parser")

app.use(bodyParser.json())

/**
 * @returns
 *      4 random featured apps
 *      8 trending apps
 *      8 recently added
 *      All categories
 */

// Getting the apps for homepage
app.get("/", async (req, res) => {
    const featured = await db.Project.aggregate([{ $sample: { size: 4 } }])
    const trending = await db.Project.find()
        .sort({ views: -1 })
        .limit(8)
    const recent = await db.Project.find()
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
    })
    res.json({
        projects
    })
})

app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
})
