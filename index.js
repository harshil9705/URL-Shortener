const express= require("express")
const { connection } = require("./config/database")
const { urlrouter } = require("./routes/url.router")
const path = require("path")
const { userrouter } = require("./routes/user.router")
const cookie = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie())
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.static(__dirname + "public"))

app.use("/url",urlrouter)
app.use("/user",userrouter)

app.listen(8090,()=>{
    console.log("server running on 8090");
    connection()
})
