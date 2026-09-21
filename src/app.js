const express = require("express")

const app = express()

app.use( "/test" , (req , res)=>{
    res.send("hjkdf")
})
 app.use( "/te" , (req , res)=>{
    res.send("hjkdf")
})
app.listen(3 , ()=>{
    console.log("server is running");
    
})