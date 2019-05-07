const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    permissionLevel: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    starProjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
})

UserSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password")) {
            let password = await bcrypt.hash(this.password, 10)
            this.password = password
            next()
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
})

UserSchema.methods.comparePassword = async function(password) {
    try {
        let isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (err) {
        throw err
    }
}

module.exports = mongoose.model("User", UserSchema)
