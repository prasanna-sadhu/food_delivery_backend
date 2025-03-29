//importing all required external modules after instalition
const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')
//middleware
const PORT=3000
const app=express()
app.use(express.json())
//connecting mangoose
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("db connected succesfully...")
).catch(
    (err)=>console.log(err)
)
//api landing page i.e.,localhost:3000
//any api structure
app.get('/',async(req,res)=>{
try{
res.send("<h1 align=center >welcome to the backend </h1>")
}
catch(err){
    console.log(err)
}
})
//upto this
//ApI registration

app.post('/register',async(req,res)=>{
 const{user,email,password}=req.body
try{
const hashpassword=await bcrypt.hash(password,10)
const newUser=new User({user,email,password:hashpassword})
await newUser.save()
console.log("New registration successfully")
res.json({message:"user created..."})//json:keys and values like dictionary
console.log("user registration completed")

}
catch(err){
    console.log(err)
}
})
//api login page
app.post('/login',async(req,res)=>{
    const{email,password}=req.body
   try{
    const user=await User.findOne({email});
    if(!user||!(await bcrypt.compare(password,user.password)))
    {
     return res.status(400).json({message:"invalid creditianals"});
    }
    res.json({mesage:"login successfull",username:user.username});
   }
   catch(err){
       console.log(err)
   
   }
   })
//server running and testing
app.listen(PORT,(err)=>{
    if(err){

        console.log(err);
    }
    console.log("server is  running:"+PORT)
})
