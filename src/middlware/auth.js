
const Authuser = (req , res , next)=>{
const token = "abc";
const Authorizing = token === "abc";
if(!Authorizing){
    res.status(401).send("Sorry invalid information")
}
else{
    next()
}
}

const Authadmin = (req ,res , next)=>{
    const token = "abc";
const Authorizing = token === "abc";
if(!Authorizing){
    res.status(401).send("Sorry invalid information")
}
else{
    next()
}
}

module.exports = {Authuser , Authadmin}