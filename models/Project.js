const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
    {
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
                type: mongoose.Schema.Types.ObjectId,
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
                required: true
            }
        ],
        languages: [
            {
                type: String,
                required: true
            }
        ],
        photos: [
            {
                type: String,
                required: true
            }
        ],
        icon: {
            type: String,
            required: true
        },
        externals: [String],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review"
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Project", ProjectSchema)
