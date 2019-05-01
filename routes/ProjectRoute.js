const db = require("../models"),
    router = require("express").Router()

const authorize = (req, _, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        const { _id: userId } = payload
        req.userId = userId
        next()
    } catch (error) {
        next({
            status: 401,
            type: "UNAUTHORIZED"
        })
    }
}

router.post("/", authorize, async (req, res, next) => {
    try {
        const { _id } = await db.Project.create(req.body)
        res.status(201).json({ project: _id })
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        if (Object.keys(req.query).length > 0) {
            if (req.query.category) {
                const { category, offset = 0 } = req.query
                const { name, photo } = await db.Category.findById(category)
                const projects = await db.Project.find(
                    {
                        categories: category
                    },
                    "name icon headline"
                )
                    .skip(Number(offset))
                    .limit(12)
                res.status(200).json({
                    name,
                    photo,
                    projects
                })
            } else if (req.query.user) {
                const { user, offset = 0 } = req.query
                const { name, photo } = await db.User.findById(user)
                const projects = await db.Project.find(
                    {
                        developers: user
                    },
                    "name icon headline"
                )
                    .skip(Number(offset))
                    .limit(12)
                res.status(200).json({
                    name,
                    photo,
                    projects
                })
            }
        } else {
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
        }
    } catch (err) {
        next(err)
    }
})

router.get("/search", async (req, res, next) => {
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

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const project = await db.Project.findById(
            id,
            "name icon headline description photos views stars"
        )
            .populate("categories", "name photo")
            .populate("developers", "username photo")
        res.status(200).json({
            project
        })
    } catch (err) {
        next(err)
    }
})

router.get("/:id/reviews", async (req, res, next) => {
    try {
        const id = req.params.id
        const reviews = await db.Review.find(
            { project: id },
            "author content likes"
        ).populate("author", "name photo")
        res.status(200).json({
            reviews
        })
    } catch (err) {
        next(err)
    }
})

router.post("/:id/reviews", authorize, async (req, res, next) => {
    try {
        const { content } = req.body
        const review = await db.Review.create(
            { author: req.userId, project: req.params.id, content },
            "author content likes"
        ).populate("author", "name photo")
        res.status(201).json({
            review
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
