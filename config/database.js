const { default: mongoose } = require("mongoose");

const connection  = () =>{
    mongoose.connect("mongodb://localhost:27017/url-shortner")
    console.log("database connected");
}

module.exports = {connection}