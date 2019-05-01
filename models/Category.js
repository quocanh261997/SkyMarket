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

CategorySchema.virtual("id").get(function() {
    return this._id.toHexString()
})

CategorySchema.set("toJSON", {
    virtuals: true
})

module.exports = monoogse.model("Category", CategorySchema)
