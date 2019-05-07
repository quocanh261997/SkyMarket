const db = require("../models"),
    jwt = require("jsonwebtoken"),
    router = require("express").Router()

router.get("/search", async (req, res, next) => {
    try {
        const q = req.query.q
        const users = await db.User.find(
            {
                username: { $regex: q, $options: "i" }
            },
            "username photo"
        ).limit(5)
        res.status(200).json({
            users
        })
    } catch (err) {
        next(err)
    }
})

router.get("/:id/starProjects", async (req, res, next) => {
    try {
        const id = req.params.id
        const { starProjects } = await db.User.findById(
            id,
            "starProjects"
        ).limit(5)
        res.status(200).json({
            starProjects
        })
    } catch (err) {
        next(err)
    }
})

router.post("/signup", async (req, res, next) => {
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
        .then(({ _id, username, photo, permissionLevel }) => {
            let token = jwt.sign(
                { _id, username, photo, permissionLevel },
                process.env.SECRET_KEY
            )
            res.status(201).json({
                _id,
                username,
                photo,
                permissionLevel,
                token
            })
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

router.post("/signin", async (req, res, next) => {
    const { userInput, password } = req.body
    try {
        let user = await db.User.findOne({
            $or: [{ email: userInput }, { username: userInput }]
        })
        let isMatch = await user.comparePassword(password)
        if (isMatch) {
            const { _id, username, photo, starProjects, permissionLevel } = user
            let token = jwt.sign(
                { _id, username, photo, permissionLevel },
                process.env.SECRET_KEY
            )
            res.status(200).json({
                _id,
                username,
                photo,
                starProjects,
                permissionLevel,
                token
            })
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

module.exports = router
