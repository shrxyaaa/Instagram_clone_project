
import React,{useState,useEffect, useContext} from "react";
import {useNavigate } from 'react-router-dom';
import {UserContext} from '../../App'; 

const UpdateProfile=()=>{

  const {state,dispatch}=useContext(UserContext)
  const [url,setUrl]= useState("")
  const [title,setTitle]= useState(state.bio)
  const [image,setImage]= useState(state.dp)
const navigate=useNavigate()
useEffect(()=>{
  if(url){PostData()}
},[url])


const PostData=()=>{
  console.log(image)
  console.log(url)

  fetch("/updateProfile",{
      method:"put",
      headers:{
       "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt") 
      },
    body:JSON.stringify({
      bio:title,
      dp:url
    })
  })
  .then(res=>res.json())
  .then(data=>{

    if(data.error){
      console.log(data.error)
    }
    else{
      console.log(data)
      dispatch({type:"PROFILE",payload:{bio:data.bio,dp:data.dp}})
      localStorage.setItem("user",JSON.stringify(data))
     navigate("/profile")
    }
       
       
    }).catch(err=>console.log(err))
 
} 

  const postDetails=()=>{
    const data= new FormData()
     data.append("file",image)
     data.append("upload_preset","insta-clone")
     data.append("cloud_name","dvbeiqiig")
     fetch("https://api.cloudinary.com/v1_1/dvbeiqiig/image/upload",{
      method:"post",
      body:data
     })
     .then(res=>res.json())
     .then(data=>{
      setUrl(data.url)
      
     })
     .catch(err=>console.log(err))
     
  }


    return (
    <div className="card input-filed"
      style={{
        margin:"10px auto",
        maxWidth:"500px",
        padding:'20px',
        textAlign:'center'
      }}
    >
        <input 
        type='text' 
        placeholder="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input type="file" multiple onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
        
      </div>
    </div>
    <button className="login-btn "
     type="submit"
     name="action"
     onClick={()=>postDetails()}>Post
         </button>

    </div>
    )}

export default  UpdateProfile