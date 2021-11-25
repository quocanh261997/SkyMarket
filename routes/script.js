const db = require("../models")
const projects = require("../models/data/projects.json")
const categories = require("../models/data/categories.json")

const insertProjects = async () => {
    // Only insert 100 projects into the db
    for (let i = 0; i < projects.length; i++) {
        await db.Project.create(projects[i])
    }
}

const insertCategories = async () => {
    for (let i = 0; i < categories.length; i++) {
        await db.Category.create(categories[i])
    }
}

Promise.all([
    insertProjects(),
    insertCategories()
],
).then(() => {
    console.log("Done inserting into db")
    process.exit()
})

