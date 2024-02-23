const { user } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// GET

const getsignup = (req,res)=>{
    res.render("signup")
}

const getlogin = (req,res)=>{
    res.render("login")
}

// POST

const signup = async(req,res)=>{
    const {email,password,username} = req.body

    const data = await user.findOne({email})

    if (data) {
        res.json({error:"account already exist"})
    }
    bcrypt.hash(password,5,async(error,hash)=>{
        
        if (error) {
            res.json({error:error.message})
        }

        const obj = {
            email,
            password:hash,
            username
        }

        const data = await user.create(obj)
        const token =jwt.sign({id:data.id,email:data.email,username:data.username},"privateKey")
        res.cookie("token",token).redirect("/url/home")
    })

}

const login = async(req,res)=>{
    const {email,password} = req.body

    try {
        const data= await user.findOne({email})

        if (data) {
            bcrypt.compare(password,data.password,(error,result)=>{
                if (result) {
                    const token =jwt.sign({id:data.id,email:data.email,username:data.username},"privateKey")
                    return res.cookie("token",token).redirect("/url/home")
                }
                else if(error){
                    return res.json({error:error.message})
                }
                else{
                    return res.json({error:"password incorrect"})
                }
            })
        }
        else{
            res.json({error:"account not exist pls signup first"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

module.exports = {signup,getsignup,getlogin,login}