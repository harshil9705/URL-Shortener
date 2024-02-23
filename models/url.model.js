const mongoose = require("mongoose")

const urlschema = new mongoose.Schema({
    shortId:{
        type : String,
        requireed: true,
        unique:true,
    },
    redirectURL:{
        type:String,
    },
    visitHistory: [{timestamp : {type : Number }}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},
{timestamps:true});

const URL = mongoose.model("url",urlschema)

module.exports = {URL}
    