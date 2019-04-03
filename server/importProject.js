const Project = require("./models").Project
const projects = require("./ProjectSchema.json")

Project.insertMany(projects, err => {
    if (err) throw err
    console.log("Added successfully")
})
