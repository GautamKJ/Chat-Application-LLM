import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import {login} from "../api/UserRequest";
const Login = () => {

  let navigate=useNavigate();

  const [credentials,setcredentials]=useState({email:"",password:""});



const setDetail=(e)=>{
  setcredentials({...credentials,[e.target.name]:e.target.value});
}

const onsubmit= async(e)=>{
  e.preventDefault();

  const response= await login(credentials);
  if(response.success==true){  
    localStorage.setItem("user",response.userID);
    navigate("/dashboard");
  }
  

  }

  document.title = "Log-In";
 
  
  return (  
    <>
    <div className="container_login">
    <div className="header">
    <div className='text'>Login</div>
    <div className='underline'></div>
    

    </div>
    <form onSubmit={onsubmit} className='inputs'>
    
    <div className='input'>
        
        <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={setDetail} />
    </div>   
      
    <div className='input'>
        
        <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={setDetail} />
    </div>   
    <span>Not Register?<Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link></span>
    <div className='submit-container'>
    <button type="submit" className='submit' disabled={credentials.email==="" || credentials.password===""} >Login</button>
        
    </div>
    </form>

        </div>
          
</>
    
  
  )
}


export default Login;