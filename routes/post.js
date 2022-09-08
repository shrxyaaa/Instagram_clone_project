const express= require('express')
const router= express.Router()
const  mongoose = require('mongoose')
const Post = mongoose.model("Post")
const jwt=require('jsonwebtoken')
const {JWT_SECRET}= require('../config/keys')
const requreLogin= require('../middleware/requreLogin')

router.get('/allPost',requreLogin,(req,res)=>{
       Post.find().populate("postedBy","_id name").populate("comments.postedBy","_id,name").then(posts=>{
        res.json({posts})
       }).catch(err=>{console.log(err)})
})

router.get('/followingPost',requreLogin,(req,res)=>{
  
    Post.find({$or:[{postedBy:{$in:req.user.following}},{postedBy:{$in:req.user._id}}]})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id,name").then(posts=>{
     res.json({posts})
    }).catch(err=>{console.log(err)})
})

router.get('/myPost',requreLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name").then(myPosts=>{
     res.json({myPosts})
    }).catch(err=>{console.log(err)})
})


router.post('/createPost',requreLogin,(req,res)=>{
      const {title, url}=req.body
          if(!title||!url){
           res.status(422).json({error:"Please add all the fields"})
         }
         req.user.password=undefined;
       
         const post= new Post(
            {
                title,
                photo:url,
                postedBy:req.user
            })
        post.save().then(result=>{
           res.json({post:result})
        })
        .catch(err=>{
            console.log(err)
        })   
})

router.put('/like',requreLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
      $push:{likes:req.user._id}
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

router.put('/unlike',requreLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
      $pull:{likes:req.user._id}
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

router.put('/addComment',requreLogin,(req,res)=>{
      const comment = {
        text:req.body.text,
        postedBy:req.user._id
      }
      Post.findByIdAndUpdate(req.body.postId,{$push:{comments:comment}},{
        new:true
    })
    .populate("comments.postedBy","_id,name")
    .populate("postedBy","_id,name")
    .exec((err,result)=>
    {
        if(err){
            res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

router.delete('/deletePost:postId',requreLogin,(req,res)=>{
    Post.find({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err|| !post){res.status(422).json({error:err})
    }
    if(post.postedBy._id.toString()===req.user.toString()){
         post.remove()
         .then(result=>{
            res.json({message:"successfully deleted"})
         })
         .catch(err=>console.log(err))    
    }
    })
})



module.exports=router
