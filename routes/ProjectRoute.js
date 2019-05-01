const db = require("../models")
const express = require("express")
const router = express.Router()

router.get("/home", async (req, res) => {
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

router.get("/", async (req, res, next) => {
    try {
        const categoryId = req.query.category
        const offset = req.query.offset || 0
        const { name, photo } = await db.Category.findById(categoryId)
        const projects = await db.Project.find(
            {
                categories: categoryId
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
    } catch (err) {
        console.log(err)
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

router.post("/", async (req, res, next) => {
    try {
        const { _id } = await db.Project.create(req.body)
        res.status(201).json({ project: _id })
    } catch (err) {
        next(err)
    }
})

module.exports = router
