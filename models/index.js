const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const options = {
    useNewUrlParser: true,
}

console.log(process.env.SECRET_KEY)

mongoose.set("debug", true)
mongoose.Promise = global.Promise
mongoose
    .connect(
        process.env.DB_URI,
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
