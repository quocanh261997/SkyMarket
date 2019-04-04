const Project = require("./models").Project
let projects = require("./ProjectSchema.json")

projects = projects.map(p => {
    return {
        ...p,
        developers: p.developers.map(d => d.$oid),
        reviews: p.reviews.map(d => d.$oid)
    }
})

Project.insertMany(projects, err => {
    if (err) throw err
    console.log("Added successfully")
})
