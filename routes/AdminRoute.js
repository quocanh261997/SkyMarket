const db = require("../models"),
    jwt = require("jsonwebtoken"),
    router = require("express").Router()

const authorizeAdmin = (req, _, next) => {
    try {
        const token = req.get("Authorization").split(" ")[1]
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        const { permissionLevel } = payload
        if (permissionLevel < 1) throw new Error()
        req.permissionLevel = permissionLevel
        next()
    } catch (err) {
        next({
            status: 401,
            type: "UNAUTHORIZED"
        })
    }
}

router.get("/", authorizeAdmin, async (req, res, next) => {
    try {
        const projects = await db.PendingProject.find({})
        res.status(200).json({ projects })
    } catch (err) {
        next(err)
    }
})

router.post("/", authorizeAdmin, async (req, res, next) => {
    try {
        const { id, confirmed } = req.body
        if (confirmed) {
            const {
                icon,
                name,
                headline,
                description,
                photos,
                developers,
                categories
            } = await db.PendingProject.findByIdAndRemove(id)
            await db.Project.create({
                icon,
                name,
                headline,
                description,
                photos,
                developers,
                categories
            })
        } else {
            await db.PendingProject.findByIdAndRemove(id)
        }
        res.status(204).json({})
    } catch (err) {
        next(err)
    }
})

module.exports = router
