import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';


const Signup =()=>
{
    const [email, setEmail]= useState("")
    const [name, setName]= useState("")
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [alert, setAlert]= useState("")

    const [dp, setDp]= useState("")
    const [url, setUrl]= useState("")

    const navigate=useNavigate();

    const PostData=()=>{
         fetch("/signup",{
               method:"post",
               headers:{
                   "Content-Type":"application/json"
               },
               body:JSON.stringify({
                   name,
                   password,
                   username,
                   email
               })
         }).then(res=>res.json())
         .then(data=>{
          if(data.error){
            setAlert(data.error)
          }
          else{
            navigate("/signin")
          }
          console.log(data)
         }).catch(err=>console.log(err))
    }


    return(
        <div className='myCard'>
        <div className="card authCard ">
        <h2 className='brand-logo'>Instagram</h2>
        <h3 className='suc1c'>Sign up to see photos and videos from your friends.</h3>
        <h3 className='suc1c' style={{color:"red", fontSize: "13px"}}
        >{alert}</h3>
        <input 
        className="login-input" 
        type="text" 
        placeholder="Mobile number or email address"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input  
        className="login-input" 
        type="text" 
        placeholder="Full Name"
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        <input
         className="login-input" 
         type="text" 
         placeholder="Username"
         value={username}
         onChange={(e)=>{setUsername(e.target.value)}}
         />
        <input
          className="login-input"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          />
        <h4 className='suc1c' style={{fontSize: "12px"}}>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</h4>
        <button 
        className="login-btn " 
        type="submit" 
        name="action"
        onClick={()=>PostData()}>Sign Up</button>

        </div>

        <div className="card switch-card">
        <h4 className='sc2c'>Have an account? <span ><Link to="/signin">Log In</Link></span></h4>
        
        </div>


      </div>
    )
}

export default Signup;