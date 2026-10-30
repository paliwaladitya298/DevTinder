const validator = require("validator")

const validationUser = (req) =>{

    const {firstName , lastName , emailId , password} = req.body

    if(!firstName || !lastName){
        console.log("Name not valid");
        throw new Error("Name not valid");
    }

    if(!validator.isEmail(emailId)){
        throw new Error("email is not correct")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter the strong password")
    }
}

module.exports = {validationUser}