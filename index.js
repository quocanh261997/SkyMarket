require("dotenv").config()
const PORT = 8080 || process.env.port

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
    const randomApps = await db.Project.aggregate([{ $sample: { size: 4 } }], {
        _id: 0
    })
    const trendingApps = await db.Project.aggregate(
        [{ $sample: { size: 8 } }],
        { _id: 0 }
    )
    const recentApps = await db.Project.aggregate([{ $sample: { size: 8 } }], {
        _id: 0
    })
    res.json({
        randomApps,
        trendingApps,
        recentApps
    })
})

// Getting the list of projects that have the queried category
app.get("/:category", async (req, res) => {
    const category = req.params.category
    const categoryApps = await db.Project.find(
        { category: { $eq: category } },
        { _id: 0 }
    )
    res.json({
        categoryApps
    })
})

// Getting the list of projects based on queried name
app.get("/:name", async (req, res) => {
    const name = req.params.name
    const app = await db.Project.find({ $text: { $search: name } })
    res.json({
        app
    })
})

app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
})
