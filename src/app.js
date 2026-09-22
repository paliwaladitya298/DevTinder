const express = require("express")

const app = express()

app.get("/a*c", (req , res)=>{
    res.send("a aur b ke bich me kuch bhi likho ")
})

app.get("/a{b}c", (req , res)=>{
    res.send("ignore b ") 
})



app.get(/.*fly$/ , (req , res)=>{
    res.send("kuch bhi likho par ankhri me fly hua to chale ga ")
})

// URL me se kisi chiz ko extract krna ho to req.query likh te hai (suppose browser pe kisi ne likha hoga  http://localhost:3000/user?UserId=90&token=69)
app.get("/user", (req , res)=>{
    console.log(req.query);
    res.send("hello")
})

app.get("/user/:userId/:name/:age" ,(req , res)=>{
    console.log(req.params);
    res.send("learning req.params")
})

app.use("/dmin", (req , res , next)=>{
   console.log("route handler 1");
   res.send("send 1")
   next()
},
(req , res)=>{
   console.log("route handler 2");
   res.send("send 2")
})




app.listen(3000 , ()=>{
    console.log("server is running");
    
})