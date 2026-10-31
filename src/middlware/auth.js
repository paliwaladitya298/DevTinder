const jwt = require("jsonwebtoken")
const {User} = require("../model/userModel") 

const Authuser = async(req , res , next)=>{
try {
    const cookie = req.cookies
     const {token} = cookie
   if(!token){
    throw new Error("Invalid Token")
    }
    const decodedObj = await jwt.verify(token , "Adity3637")
    console.log(decodedObj);  
    const {_id} = decodedObj
    const user = await User.findById(_id)
    if(!user){
        throw new Error("User not valid");
    }
    req.user = user
    next()
} catch (error) {
    res.status(400).send("Error " + error.message)
}
}

module.exports = {Authuser}