import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {UserContext} from "../../App"

const Signin =()=>
{
const {state, dispatch }= useContext(UserContext)
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [alert, setAlert]= useState("")

  const navigate=useNavigate()

  const PostData=()=>{
    fetch("/signin",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              password,
              email
          })
    }).then(res=>res.json())
    .then(data=>{
     if(data.error){
       setAlert(data.error)
     }
     else{
        localStorage.setItem("user",JSON.stringify(data.user))
        localStorage.setItem("jwt",data.token)
        dispatch({type:"USER",payload: data.user})

       navigate("/")
     }
     console.log(data)
    }).catch(err=>console.log(err))
}
    return(
        <div className='myCard'>
        <div className="card authCard ">
        <h2 className='brand-logo'>Instagram</h2>
        <h3 className='suc1c' style={{color:"red", fontSize: "13px"}}
        >{alert}</h3>
        <input 
        className="login-input" 
        type="text" 
        placeholder="Phone number,username or email address"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
        <input  
        className="login-input" 
        type="text" 
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
        <button 
        className="login-btn " 
        type="submit" 
        name="action"  onClick={()=>PostData()}>Log In
         </button>

        </div>
        <div className="card switch-card">
        <h4 className='sc2c'>Don't have an account? <span ><Link to="/signup">Sign Up</Link></span></h4>
        
        </div>


      </div>
    )
}

export default Signin;