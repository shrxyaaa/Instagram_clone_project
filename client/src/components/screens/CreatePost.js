import React,{useState,useEffect} from "react";
import {useNavigate } from 'react-router-dom';

const CreatePost=()=>{
  const [title,setTitle]= useState("")
  const [image,setImage]= useState("")
  const [url,setUrl]= useState("https://res.cloudinary.com/dvbeiqiig/image/upload/v1662016747/wf6ex6xcvxqirx9k0fzo.jpg")
const navigate=useNavigate()
useEffect(()=>{
  if(url){PostData()}
},[url])

  const PostData=()=>{
    fetch("/createPost",{
          method:"post",
          headers:{
              "Content-Type":"application/json",
              "Authorization": "Bearer "+localStorage.getItem("jwt") 
          },
          body:JSON.stringify({
              title,
              url
          })
    }).then(res=>res.json())
    .then(data=>{
     if(data.error){
       console.log(data.error)
     }
     else{
       navigate("/")
     }
     console.log(data)
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

export default CreatePost