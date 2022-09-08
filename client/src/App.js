import './App.css';
import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home';
import Signup from './components/screens/Signup'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import UpdateProfile from './components/screens/UpdateProfile';
import {initailState, reducer} from "./reducers/userReducer"

import CreatePost from './components/screens/CreatePost';

export const UserContext= createContext()

const Routing=()=>{
const navigate= useNavigate()
const {state,dispatch}= useContext(UserContext)

useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("user"))
  if(user){
    dispatch({type:"USER", payload:user})
  }else{
    navigate('/signin')
  }
},[])

  return(
   
    <Routes>
    <Route path="/" element={<div><NavBar/><Home /></div>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route exact path="/profile" element={<div><NavBar/><Profile /></div>} />
    <Route path="/create" element={<div><NavBar/><CreatePost /></div>} />
    <Route path="/profile/:userid" element={<div><NavBar/><UserProfile /></div>}/>
    <Route path="/updateProfile" element={<div><NavBar/><UpdateProfile /></div>} />

  </Routes>
  )
}

function App() {
  const [state,dispatch]= useReducer (reducer,initailState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
     <Routing/>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
