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
        const projects = await db.Project.find({
            confirmed: false
        })
        res.status(200).json({ projects })
    } catch (err) {
        next(err)
    }
})

router.put("/:id", authorizeAdmin, async (req, res, next) => {
    try {
        const { confirmed } = req.body
        const id = req.params.id
        if (confirmed) {
            await db.Project.findByIdAndUpdate(id, {
                confirmed: true
            })
        } else {
            await db.Project.findByIdAndDelete(id)
        }
        res.status(204).json({})
    } catch (err) {
        next(err)
    }
})

module.exports = router
