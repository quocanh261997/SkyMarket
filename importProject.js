const Project = require("./models").Project

let set = new Set()

Project.find().then(projects => {
    projects.forEach(p => {
        p.categories.forEach(c => set.add(c))
    })

    console.log(set)
})
