const mongoose = require("mongoose")

const options = {
    useFindAndModify: false,
    autoIndex: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    poolSize: 500,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
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
    Review: require("./Review")
}
