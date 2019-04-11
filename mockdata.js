const db = require("./models")

const projects = require("./models/data/projects.json")

console.log(projects.length)

let promises = projects.map(async project => {
    let ru = Math.floor(Math.random() * 4) + 1, // number of developers
        rc = Math.floor(Math.random() * 4) + 1 // number of categories

    let users = await db.User.aggregate([{ $sample: { size: ru } }])
    let cates = await db.Category.aggregate([{ $sample: { size: rc } }])
    await db.Project.create({
        ...project,
        developers: users.map(u => u._id),
        categories: cates.map(c => c._id)
    })
})

Promise.all(promises)
