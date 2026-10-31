const mongoose = require("mongoose")
const validator = require("validator") 
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20
    },
    lastName : {
        type : String
    },
     emailId : {
        type : String, 
        unique : true,
        lowercase : true,
        required : true,
        trim : true,
       validate(value){
        if(!validator.isEmail(value)){
          throw new Error("email is incorrect")
        }
       }
    },
     password : {
        type : String ,
        required : true
    },
     age : {
        type : Number ,  
        min : 18
    },
     gender : {
        type : String,
        validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                 throw new Error("Gender is not valid")
            }
        } ,
        lowercase : true
    },
    about : {
       type : String ,
       default : "This section is default"
    },

    photo : {
     type : String ,
     default : "https://i.pinimg.com/236x/e8/55/74/e85574fa16954adbd40527efa949c682.jpg" 
    },

    skills : {
        type : [String]
    } ,

}, {
        timestamps : true
    })

userSchema.methods.getJWT =  async function (){
const user = this;

const token = await jwt.sign({_id : user._id } ,"Adity3637" , {expiresIn : "1h"})
return token
}

userSchema.methods.validatePassword = async function(PasswordInputByUser){

const user = this
const HashedPassword = user.password
const IsPasswordValid = await bcrypt.compare(PasswordInputByUser , HashedPassword)

return IsPasswordValid
}

const User = mongoose.model("User" , userSchema)

module.exports = {User}