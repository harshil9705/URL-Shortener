const { URL } = require("../models/url.model");
const shortid = require('shortid');

const getcreateURL = (req,res)=>{
    res.render("home")
}

const createURL = async(req,res)=>{
    const {redirectURL} = req.body
  
    try {
        const data = await URL.findOne({redirectURL:redirectURL})
        if(!redirectURL){
            res.status(400).json({error :"url required"})
        }
        else if (data) {
            res.status(404).json({error:"url already exist..."})
        }
        else{
            const shortID = shortid();
            const obj = {
                shortId:shortID,
                redirectURL:redirectURL,
                visitHistory : [],
                createdBy:req.user
            }
            await URL.create(obj)
            return res.render("home", {id : shortID})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

const call = async(req,res)=>{
    const {shorturl} = req.params
    try {
        const data= await URL.findOneAndUpdate({shortId:shorturl},{$push : {
            visitHistory:{timestamp :Date.now()}
        }})
        
        res.redirect(data.redirectURL)
    } catch (error) {
        res.json({error:error.message})
    }
}

const analytics = async(req,res)=>{
    const {url} = req.params
    try {
        const data = await URL.findOne({shortId:url})
        res.json({totalclick:data.visitHistory.length,analytics:data.visitHistory})
    } catch (error) {
        res.json({error:error.message})
    }
} 

const home = async (req,res)=>{
    const allurls = await URL.find({createdBy : req.user})
    res.render("home",{urls:allurls})
}


module.exports = {createURL,call,analytics,home,getcreateURL    }