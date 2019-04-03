const monoogse = require("mongoose")

const UserSchema = new monoogse.Schema({
    gid: String,
    ghid: String,
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

module.exports = monoogse.model("User", UserSchema)
