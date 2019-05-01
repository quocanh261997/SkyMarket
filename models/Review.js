const monoogse = require("mongoose")

const ReviewSchema = new monoogse.Schema({
    author: {
        type: monoogse.Schema.Types.ObjectId,
        ref: "User"
    },
    project: {
        type: monoogse.Schema.Types.ObjectId,
        ref: "Project"
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = monoogse.model("Review", ReviewSchema)
