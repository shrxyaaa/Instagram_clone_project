const express= require('express')
const router= express.Router()
const  mongoose = require('mongoose')
const Post = mongoose.model("Post")
const jwt=require('jsonwebtoken')
const requreLogin= require('../middleware/requreLogin')
const User = mongoose.model("User")

router.get('/user/:id',requreLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err)
            {return res.status(422).json({error:err})}
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found",message:req.params.id})
    })

})

router.put('/follow',requreLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,
        {$push:{followers:req.user._id}},
        {new:true },
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }

            User.findByIdAndUpdate(req.user._id,
                {$push:{following:req.body.followId}},
                {new:true })
                .then(result=>{
                    res.json(result)
                }).catch(err=>{
                    return res.status(422).json({error:err})
                })
            
        })
})

router.put('/unfollow',requreLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,
        {$pull:{followers:req.user._id}},
        {new:true },
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }

            User.findByIdAndUpdate(req.user._id,
                {$pull:{following:req.body.unfollowId}},
                {new:true })
                .then(result=>{
                    res.json(result)
                }).catch(err=>{
                    return res.status(422).json({error:err})
                })
            
        })
})


router.put('/unfollow',requreLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,
        {$pull:{followers:req.user._id}},
        {new:true },
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }

            User.findByIdAndUpdate(req.user._id,
                {$pull:{following:req.body.unfollowId}},
                {new:true })
                .then(result=>{
                    res.json(result)
                }).catch(err=>{
                    return res.status(422).json({error:err})
                })
            
        })
})


router.put('/updateProfile',requreLogin,(req,res)=>{
    const {dp, bio}=req.body
    if(!dp&&!bio){
      return res.status(422).json({error:"Please add atleast one  field"})
   }

    User.findByIdAndUpdate(req.user._id,{
      dp,
      bio
    },{
        new:true
    }).exec((err,result)=>
    {
        if(err){
            res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})



module.exports=router