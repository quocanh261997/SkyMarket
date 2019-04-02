const monoogse = require("mongoose")

const ReviewSchema = new monoogse.Schema({
    author: {
        type: monoogse.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    photos: [String],
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            author: {
                type: monoogse.Schema.Types.ObjectId,
                ref: "User"
            },
            content: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = monoogse.model("Review", ReviewSchema)
