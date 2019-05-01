const db = require("../models"),
    router = require("express").Router()

router.get("/", async (req, res) => {
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

router.get("/search", async (req, res, next) => {
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

module.exports = router
