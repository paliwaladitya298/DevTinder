const express = require("express")
const  app = express()
const {connectB} = require("./config/database")
const {User} = require("./model/userModel")
const {validationUser} = require("./utils/validation")
const mongoose = require("mongoose")



app.use(express.json())

app.post("/signUp" , async (req ,res)=>{
 
    try{
    // validation of User

    validationUser(req)

    const addedUser = new User(req.body)
    await addedUser.save()
    res.send("User data added")
    }
     catch(err){
        res.status(400).send(err.message)
     }
})

app.get("/user" , async (req ,res)=>{

const userEmail = req.body.emailId  

try {
   const Userfound =  await User.find({emailId : userEmail})
   res.send(Userfound)
    
} catch (err) {
    res.send()
}
})

app.get("/useronlyone", async (req ,res)=>{

const userEmail = req.body.emailId  

try {
   const Userfound =  await User.findOne({emailId : userEmail})
   res.send(Userfound)
    
} catch (err) {
    res.send()
}
})

app.get('/feed', async (req ,res)=>{
try {
    const allUser = await User.find({})
    res.send(allUser)
} catch (err) {
    res.send("something went wrong")
}
})

app.delete('/user' , async (req ,res) =>{
const userId = req.body.userid

try {
      const user = await User.DeleteMany(userId)
    res.send(" User deleted")
} catch (error) {
    res.send("something went wrong ")
}
})


app.patch('/user' , async (req ,res , next) =>{
const userId = req.body.userId
const data = req.body;

const ALLOWED_UPDATE = [
    "userId",
    "photo",
    "about",
    "gender",
    "age",
    "skills"
]

try {
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATE.includes(k))
console.log(isUpdateAllowed);

if(!isUpdateAllowed){
    throw new Error("Update not allowed ")
}
if(data?.skills?.length > 3){
throw new Error("you can not add more than 3 skills")
}
     const user = await User.findByIdAndUpdate(userId , data  , {returnDocument : "after" , runValidators : true} )
    res.send("user update Successfully")
} catch (error) {
    res.status(400).send(error.message)
}
})


connectB().then(  ()=>{
    console.log("Database connected successfully");
  
    app.listen(3000 , ()=>{console.log("Server is running on port 3000");
})
}
).catch((err) =>{ 
    console.log(err);
    
})
