const monoogse = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new monoogse.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    }
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

module.exports = monoogse.model("User", UserSchema)
