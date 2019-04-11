const db = require("./models")

const projects = require("./projects.json")

for (let project of projects) {
    let ru = Math.floor(Math.random() * 4) + 1,
        rc = Math.floor(Math.random() * 3) + 1

    db.User.aggregate([{ $sample: { size: ru } }]).then(users => {
        db.Category.aggregate([{ $sample: { size: rc } }]).then(cates => {
            db.Project.create({
                ...project,
                developers: users.map(u => u._id),
                categories: cates.map(c => c._id)
            })
        })
    })
}
