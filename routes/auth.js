const express= require('express')
const router= express.Router()
const  mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}= require('../config/keys')
const requreLogin= require('../middleware/requreLogin')

router.get('/protected',requreLogin,(req,res)=>
{
    res.send("hello");
}
)



router.post('/signup',(req,res)=>{
    const {name, username, email, password}= req.body
    if(!email|| !username ||!password||!name){res.status(422).json({error:"please add all the fields"})}
    User.findOne({$or:[{email:email},{username:username}]})
    .then((savedUser)=>{
         if(savedUser){
            return res.status(422).json({error:" User Already exists"})
           }
        bcrypt.hash(password,1)
        .then(hashedPassword=>{
           const user=new User({
            email,
            username,
            password:hashedPassword,
            name
           })
    
           user.save()
           .then(user=>{
                 res.json({message:"Saved successfully"})

           })
           .catch(err=>
            {console.log(err)
            })
           })   
       })
        .catch(err=>{
            console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email, password}= req.body
    if(!email|| !password){
        res.status(422)
        .json({error:"Either Email or Password is missing"})}
    User.findOne({$or:[{email:email},{username:email}]})
    .then((savedUser)=>{
         if(!savedUser){
            return res.status(422).json({error:"Invalid credentials"})
           }
        bcrypt.compare(password,savedUser.password)
        .then(matched=>{
            if(matched){
                const token= jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,username,bio,following,followers,dp}= savedUser
                return res.json({token,user:{_id,name,email,username,bio,following,followers,dp}})
 
            }
            else{
                return res.json({error:"Invalid email or password"})
            }

          
           }).catch(err=>{
            console.log(err)   
       })  
    })
})

module.exports= router;