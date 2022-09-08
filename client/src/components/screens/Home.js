import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'



const Home =()=>
{
    const {state,dispatch}=useContext(UserContext)
    const [data,setData]= useState([])
    useEffect(()=>{
        fetch("/followingPost",{
          headers:{
            "Authorization":"Bearer " + localStorage.getItem("jwt") 
          }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts);
        })
        },[])


     const likePost=(id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
              "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
          body:JSON.stringify({
             postId:id
          })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
          const newData= data.map(item=>{
              if(item._id===result._id){
                return result
              }
              else return item
             }) 
             setData(newData)
            }).catch(err=>console.log(err))}   

     const unlikePost=(id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
             "Content-Type":"application/json",
              "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
          body:JSON.stringify({
             postId:id
          })
        })
        .then(res=>res.json())
        .then(result=>{
              //console.log(result)
             const newData= data.map(item=>{
              if(item._id===result._id){
                return result
              }
              else return item
             }) 
             setData(newData)
          }).catch(err=>console.log(err))
       
     } 

     const addComment= (text,id)=>{
        fetch("/addComment",{
            method:"put",
            headers:{
             "Content-Type":"application/json",
              "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                postId:id,
                text
            })
        }) .then(res=>res.json())
        .then(result=>{
              console.log(result)
             const newData= data.map(item=>{
              if(item._id===result._id){
                return result
              }
              else return item
             }) 
             setData(newData)
          }).catch(err=>console.log(err))
     }

     const deletePost=(id)=>{
        fetch("/deletePost/${id}",{
            method:"put",
            headers:{
              "Authorization":"Bearer " + localStorage.getItem("jwt") 
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
        })

     }
    
    return(
        <div  className='home' 
        style={{
            maxWidth:"60em",
            margin:"0px auto",

        }}>
            {
                data.map(item=>{return(
                
                    <div className='card home-card'
                    key={item._id}
                    style={{
                      maxWidth:"35em",
          
                  }}>
                       <h5 style={{marginLeft:"15px",
                       borderRadius: "0 0 2px 2px",
                       }}><Link to={(item.postedBy._id===state._id)?"/profile":"/profile/"+item.postedBy._id}>{item.postedBy.name}</Link> 
                       {
                        (item.postedBy._id==state._id)&&
                       <i 
                       style={{float:"right"}}
                       className="material-icons " 
                      onClick={()=>{}}
                      >delete</i>}
                      </h5>
                       <div className='card-image' >
                       <img className='item'
                       onDoubleClick={()=>{item.likes.includes(state._id)?unlikePost(item._id):likePost(item._id)}}
                       src={item.photo}/>
                       </div>
                       <div>
                    
                      <i className="material-icons licon" 
                      style={item.likes.includes(state._id)?{color:"red", marginLeft:"10px !important"}:null}
                      onClick={()=>{item.likes.includes(state._id)?unlikePost(item._id):likePost(item._id)}}
                      >favorite</i>
                      
                       </div>
                       <div 
                       style={{margin:"10px 15px",
                       borderRadius: "0 0 2px 2px",
                       }}>
                       <p
                       style={{margin:"0px" }}
                       >{item.likes.length+" likes"}</p>
                      <p
                      style={{margin:"0px" }}
                      >{item.title}</p>
                      <form 
                        onSubmit={(e)=>{
                            e.preventDefault()
                            addComment(e.target[0].value,item._id)
                        }}
                      >
                      <input type="text" placeholder='add a comment'/>
                      </form>
                  </div>
                  </div>
                
                
                
                )})
            }
            
        </div>
    )
}

export default Home;