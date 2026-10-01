const express = require("express")
const  app = express()
const {connectB} = require("./config/database")
const {User} = require("./model/userModel")


app.use(express.json())


app.post("/signUp" , async (req , res)=>{
    
    console.log(req.body);
    
    const addedUser = new User(req.body)

    try{
await addedUser.save()
    res.send("User data added")
    }
     catch(err){
        res.status(400),send(err.message)
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

