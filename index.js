require("dotenv").config()
const PORT = 5000 || process.env.PORT

const app = require("express")(),
    db = require("./models"),
    bodyParser = require("body-parser"),
    jwt = require("jsonwebtoken"),
    cors = require("cors")

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
        console.log(_id)
        req._id = _id
        next()
    }
}

// Getting the apps for homepage
app.get("/home", async (req, res) => {
    try {
        const featured = await db.Project.aggregate([
            { $sample: { size: 6 } },
            { $project: { name: 1, headline: 1, icon: 1 } }
        ])
        const trending = await db.Project.find({}, "name icon headline")
            .sort({ views: -1 })
            .limit(6)
        const recent = await db.Project.find({}, "name icon headline")
            .sort({ createdAt: -1 })
            .limit(6)
        res.status(200).json({
            featured,
            trending,
            recent
        })
    } catch (err) {
        next(err)
    }
})

app.get("/category", async (req, res) => {
    try {
        const categories = await db.Category.aggregate([
            { $sample: { size: 10 } }
        ])
        res.status(200).json({
            categories
        })
    } catch (err) {
        next(err)
    }
})

// Getting the list of projects that have the queried category
app.get("/category/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const projects = await db.Project.find(
            {
                categories: id
            },
            "name icon headline"
        ).limit(15)
        res.status(200).json({
            projects
        })
    } catch (err) {
        console.log(err.message)

        next(err)
    }
})

// Getting the list of projects based on queried name
app.get("/project/search", async (req, res, next) => {
    try {
        const q = req.query.q
        const projects = await db.Project.find(
            {
                name: { $regex: q, $options: "i" }
            },
            "name icon"
        ).limit(5)
        res.status(200).json({
            projects
        })
    } catch (err) {
        next(err)
    }
})

// Getting the list of users based on queried name
app.get("/user/search", async (req, res, next) => {
    try {
        const q = req.query.q
        const users = await db.User.find(
            {
                username: { $regex: q, $options: "i" }
            },
            "name photo"
        ).limit(5)
        res.status(200).json({
            users
        })
    } catch (err) {
        next(err)
    }
})

// Getting the list of categories based on queried name
app.get("/category/search", async (req, res, next) => {
    try {
        const q = req.query.q
        const categories = await db.Category.find(
            {
                name: { $regex: q, $options: "i" }
            },
            "name photo"
        ).limit(5)
        res.status(200).json({
            categories
        })
    } catch (err) {
        next(err)
    }
})

app.post("/signup", async (req, res, next) => {
    const {
        username,
        email,
        password,
        photo = "http://www.colegioexpressao.com/assets/images/avatar-2.png"
    } = req.body
    db.User.create({
        username,
        email,
        password,
        photo
    })
        .then(({ _id, username, photo }) => {
            let token = jwt.sign(
                { _id, username, photo },
                process.env.SECRET_KEY
            )
            res.status(201).json({ _id, username, photo, token })
        })
        .catch(err => {
            if (err.code === 11000) {
                if (err.message.indexOf("username") !== -1)
                    next({
                        status: 400,
                        type: "DUPLICATE_USERNAME"
                    })
                else
                    next({
                        status: 400,
                        type: "DUPLICATE_EMAIL"
                    })
            } else next(err)
        })
})

app.post("/signin", async (req, res, next) => {
    const { userInput, password } = req.body
    try {
        let user = await db.User.findOne({
            $or: [{ email: userInput }, { username: userInput }]
        })
        let isMatch = await user.comparePassword(password)
        if (isMatch) {
            const { _id, username, photo } = user
            let token = jwt.sign(
                { _id, username, photo },
                process.env.SECRET_KEY
            )
            res.status(200).json({ _id, username, photo, token })
        } else
            next({
                status: 400,
                type: "INVALID_PASSWORD"
            })
    } catch (err) {
        next({
            status: 400,
            type: "INVALID_EMAIL"
        })
    }
})

app.post("/user/:id/upload", async (req, res, next)=>{
    const {}
})

// function isEmail(email) {
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return re.test(email)
// }

app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        type: err.type || "INTERNAL_ERROR"
    })
})

app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
})
