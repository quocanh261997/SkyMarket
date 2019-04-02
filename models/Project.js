const monoogse = require("mongoose")

const ProjectSchema = new monoogse.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    developers: [
        {
            type: monoogse.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        default: 0
    },
    categories: [
        {
            type: String,
            enum: [""],
            required: true
        }
    ],
    languages: [
        {
            type: String,
            enum: [""],
            required: true
        }
    ],
    photos: [
        {
            type: String,
            required: true
        }
    ],
    externals: [String],
    reviews: [
        {
            type: monoogse.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

module.exports = monoogse.model("Project", ProjectSchema)
