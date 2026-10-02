const express = require("express")
const  app = express()
const {connectB} = require("./config/database")
const {User} = require("./model/userModel")
const mongoose = require("mongoose")


app.use(express.json())

app.post("/signUp" , async (req ,res)=>{
        
     const addedUser = new User(req.body)


    try{
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
     const user = await User.findByIdAndUpdate(userId , data  , {returnDocument : "after" , runValidators : true} )
        next()
} catch (error) {
    res.status(400).send(error.message)
}
} , (req , res)=>{
      res.send(" User Updated")
})

connectB().then(  ()=>{
    console.log("Database connected successfully");
  
    app.listen(3000 , ()=>{console.log("Server is running on port 3000");
})
}
).catch((err) =>{ 
    console.log(err);
    
})

