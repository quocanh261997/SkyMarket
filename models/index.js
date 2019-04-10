const mongoose = require("mongoose")

mongoose.set("debug", true)
mongoose.Promise = global.Promise
mongoose
    .connect(
        "mongodb://quocanh261997:diamond26@ds135456.mlab.com:35456/skymarket"
    )
    .catch(error => console.error(`MongoDB connection error: ${error}`))

module.exports = {
    User: require("./User"),
    Project: require("./Project"),
    Review: require("./Review")
}
