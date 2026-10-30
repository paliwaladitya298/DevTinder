const mongoose = require("mongoose")
const validator = require("validator") 


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

const User = mongoose.model("User" , userSchema)

module.exports = {User}