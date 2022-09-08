import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App';
import { useNavigate } from 'react-router-dom';

const Profile =()=>{
const [myPics,setMyPics]= useState([])
const {state, dispatch }= useContext(UserContext)
console.log(state)
const navigate=useNavigate()

useEffect(()=>{
    fetch("/myPost",{
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt") 
      }
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
        setMyPics(result.myPosts)
        
        
    })
    },[])

    return(
        <>
        { (state)?
            
            <div
            style={{
                maxWidth:"70em",
                margin:"0px auto",
    
            }}
            >
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom: "1px solid grey"
                    }}>
                    <div>
                        <img style={{width:"160px",height:"160px",borderRadius:"80px"}}  
                        onClick={()=>navigate('/updateProfile')}
                        src={state.dp} 
                        />
                    </div>
                    <div>
                        <h4>{state.username}</h4>
                        
                        <div style={{
                            display:"flex", 
                            justifyContent:"space-around",
                            width:"108%"
                            
                         }}>
                            <h6>{myPics.length} Posts</h6>
                            <h6>{state.followers.length} followers</h6>
                            <h6>{state.following.length} following</h6>
                        </div>
                        <div style={{
                            justifyContent:"space-around",
                            width:"108%"
    
                            
                         }}>
                            <h6
                            style={{
                                marginBottom:"2px"
                               }} 
                            >{state?state.name:"loading"}</h6>
                            <p  
                            style={{
                          margin:"2px"
                         }} >{state.bio}<br/>
                         </p>
                        </div>
                    </div>
                </div>
                <div className='gallery'>
                    {
                   
                    myPics.map(item=>{
                        return(
                      <img className='pitem' key={item._id} src={item.photo}/>
                      )})}
                   
                </div>
            </div>
            :
            <h5>Loading</h5>
        }
        </>
        
    )
}

export default Profile;