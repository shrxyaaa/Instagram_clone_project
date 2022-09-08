import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const UserProfile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    console.log(state)
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    },[])


    const follow = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollow = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
    return(

        <>{
            userProfile?
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
                    src="https://images.unsplash.com/photo-1528426001684-1f1113c444c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1483&q=80"
                    />
                </div>
                <div>
                    <h4>{state?userProfile.user.username:"loading"}</h4>
                    {showfollow?
                    <button 
                    className="login-btn " 
                    type="submit" 
                    name="action"
                    onClick={()=>follow()}>Follow</button>
                    : 
                    <button 
                    className="login-btn " 
                    type="submit" 
                    name="action"
                    onClick={()=>unfollow()}>Unfollow</button>
                    }
                   
                    <div style={{
                        display:"flex", 
                        justifyContent:"space-around",
                        width:"108%"
                        
                     }}>
                        {console.log(userProfile.posts)}
                        <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    <div style={{
                        justifyContent:"space-around",
                        width:"108%"

                        
                     }}>
                        <h6
                        style={{
                            marginBottom:"2px"
                           }} 
                        >{state?userProfile.user.name:"loading"}</h6>
                        <p  
                        style={{
                      margin:"2px"
                     }} >{state?userProfile.user.bio:"loading"}<br/>
                     </p>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                {userProfile.posts.map(item=>{
                    return(
                  <img className='pitem' src={item.photo}/>
                  )})}
               
            </div>
        </div>
        :<h2>loading</h2>
        }
        </>
    )
}

export default UserProfile;