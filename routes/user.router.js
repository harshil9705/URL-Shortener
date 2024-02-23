const express = require("express")
const { getsignup, signup, getlogin, login } = require("../controllers/user.controller")

const userrouter = express.Router()
// get
userrouter.get("/signup",getsignup)

userrouter.get("/login",getlogin)

// post
userrouter.post("/signup",signup)

userrouter.post("/login",login)

module.exports = {userrouter}