const db = require("../models"),
    jwt = require("jsonwebtoken"),
    router = require("express").Router()

const authorize = (req, _, next) => {
    try {
        const token = req.get("Authorization").split(" ")[1]
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        const { _id: userId } = payload
        req.userId = userId
        next()
    } catch (err) {
        next({
            status: 401,
            type: "UNAUTHORIZED"
        })
    }
}

router.get("/", async (req, res, next) => {
    try {
        if (Object.keys(req.query).length > 0) {
            if (req.query.category) {
                const { category: id, offset = 0 } = req.query
                const { name, photo } = await db.Category.findById(
                    id,
                    "name photo"
                )
                const projects = await db.Project.find(
                    {
                        categories: id
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
                const { user: id } = req.query
                const { username, email, photo } = await db.User.findById(
                    id,
                    "username photo email"
                )
                const projects = await db.Project.find(
                    {
                        developers: id
                    },
                    "name icon headline"
                )
                res.status(200).json({
                    username,
                    email,
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

router.post("/", authorize, async (req, res, next) => {
    try {
        const { _id } = await db.Project.create(req.body)
        res.status(201).json({ project: _id })
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

router.put("/:id/star", authorize, async (req, res, next) => {
    try {
        const { star } = req.body
        const id = req.params.id
        await db.Project.findByIdAndUpdate(id, {
            $inc: { stars: star ? 1 : -1 }
        })
        if (star) {
            await db.User.findByIdAndUpdate(req.userId, {
                $push: { starProjects: id }
            })
        } else {
            await db.User.findByIdAndUpdate(req.userId, {
                $pull: { starProjects: id }
            })
        }
        res.status(204).json({})
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
        )
            .sort("-createdAt")
            .populate("author", "username photo")
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
        let review = await db.Review.create({
            author: req.userId,
            project: req.params.id,
            content
        })
        review = await db.Review.populate(review, {
            path: "author",
            select: "username photo"
        })
        res.status(201).json({
            review
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
