const mongoose = require("mongoose")

const options = {
    useNewUrlParser: true,
    useCreateIndex: true
}

mongoose.set("debug", true)
mongoose.Promise = global.Promise
mongoose
    .connect(
        "mongodb://tuanle:tuanlm1235@ds017155.mlab.com:17155/skymarket",
        options
    )
    .catch(error => console.error(`MongoDB connection error: ${error}`))

module.exports = {
    User: require("./User"),
    Project: require("./Project"),
    PendingProject: require("./PendingProject"),
    Review: require("./Review"),
    Category: require("./Category")
}
