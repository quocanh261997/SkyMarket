const mongoose = require("mongoose"),
    languages = require("./enums/languages"),
    categories = require("./enums/categories")

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 20,
            required: true
        },
        headline: {
            type: String,
            maxlength: 50,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        photos: [
            {
                type: String,
                required: true
            }
        ],
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
                enum: categories,
                required: true
            }
        ],
        languages: [
            {
                type: String,
                enum: languages,
                required: true
            }
        ],
        externals: [
            {
                name: String,
                link: String
            }
        ],
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
