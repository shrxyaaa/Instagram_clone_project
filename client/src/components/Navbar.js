import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../App';


const NavBar= ()=>{
    const {state,dispatch}= useContext(UserContext)
    const navigate=useNavigate()
    const renderList=()=>{
       if(state){
          return [
          <li><Link to="/"><i className="material-icons">home</i></Link></li>,
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/create"><i className="material-icons">add</i></Link></li>,
          <li>
            <button
              type="submit" 
              name="action"  
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate('/signin')
                }}>Log Out
            </button>
          </li>
          ]
       }
       else return[
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
       ]
    }

    return (    
          <nav>
          <div className="nav-wrapper white"  >
            <div className='insta-nav'>
            <Link to= {state?"/":"/signin"} className="brand-logo left">Instagram</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">        
            {renderList()}
            </ul>
            </div>
          </div>
        </nav> );

}

export default NavBar;