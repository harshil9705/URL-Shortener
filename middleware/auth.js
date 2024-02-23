const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
    const {token} = req.cookies

    try {
        if (token) {
            const data = jwt.verify(token,"privateKey")
            console.log(data);
            req.user = data.id
            next()
        }
        else{
            res.redirect("/user/login")
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

module.exports = {auth}