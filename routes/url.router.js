const express = require("express")
const { createURL, call, analytics, home, getcreateURL } = require("../controllers/url.controllers")
const { auth } = require("../middleware/auth")

const urlrouter = express.Router()

// get
urlrouter.get("/call/:shorturl",call)

urlrouter.get("/analytics/:url",analytics)

urlrouter.get("/home",auth,home)

urlrouter.get("/create",auth,getcreateURL)

// post

urlrouter.post("/",auth,createURL)

module.exports = {urlrouter}