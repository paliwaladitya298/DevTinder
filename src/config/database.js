const mongoose = require("mongoose")

const connectB = async()=> {
    mongoose.connect("mongodb+srv://paliwaladitya298_db_user:2UK4wvQEYtrhOtRc@cluster0.e6gowpp.mongodb.net/devTinder")
}

module.exports = {connectB}

