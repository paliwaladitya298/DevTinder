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
        res.status(400),send("something went wrong !!!")
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
      const user = await User.findByIdAndDelete(userId)
    res.send(" User deleted")
} catch (error) {
    res.send("something went wrong ")
}
})

app.patch('/user' , async (req ,res) =>{
const userId = req.body.userid
const data = req.body;

try {
     const user = await User.findByIdAndUpdate(userId , data  , {returnDocument : "after"})
     console.log(user);
     
    res.send(" User Updated")
} catch (error) {
    res.send("something went wrong ")
}
})

connectB().then( ()=>{
    console.log("Database connected successfully");
    app.listen(3000 , ()=>{console.log("Server is running on port 3000");
})
}
).catch((err) =>{
    console.log("Not connected to Database");
    
})

