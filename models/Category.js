const monoogse = require("mongoose")

const CategorySchema = new monoogse.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

module.exports = monoogse.model("Category", CategorySchema)
