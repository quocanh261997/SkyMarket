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
app.get("/", (req, res) => {
    db.Project.find({})
})
