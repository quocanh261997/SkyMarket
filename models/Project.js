const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 20,
            required: true
        },
        headline: {
            type: String,
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
        views: {
            type: Number,
            default: 0
        },
        stars: {
            type: Number,
            default: 0
        },
        externals: [
            {
                name: String,
                link: String
            }
        ],
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            }
        ],
        developers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        confirmed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Project", ProjectSchema)
