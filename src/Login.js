import {React,useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios"


const Login = () => {
    const history = useHistory();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

var Submit =(e)=>{
    e.preventDefault()
    axios({
        method: 'post',
        url: `http://localhost:4000/admin/login`,
        headers: {}, 
        data: {
          email:email,
          password:password
         }
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem('token',response.data.token)
        history.push("/home");
        alert("login successfull")
      })
      .catch((e) => {
        console.log(e)
        history.push("/")
        alert("wrong credentials")
    });
    
    }
const handleEmail=(e)=>{
   setEmail(e.target.value)
}
const handlePassword=(e)=>{
    setPassword(e.target.value)
}
return (
    <div className="text-center form-signin">
    <div className="login">
    <h1 className="h3 mb-3 fw-normal">Login</h1>
    </div>
    <form action="/" className="form-signin login-form" >
    <input 
    type="text"
    value={email}
    name="name"
    className="form-control top" 
    placeholder="Email"
    onChange={handleEmail} 
    required autofocus
    />
    <input 
    type="text"
    value={password}
    name="pasword"
    className="form-control middle" 
    placeholder="Password" 
    onChange={handlePassword}
    required
    />
    <div className="checkbox mb-3">
    </div>
    <button
    className="w-100 btn btn-lg btn-primary" 
    type="submit"
    onClick={Submit}
    >Login</button>
    
  </form>
   </div>
    )
}

export default Login
