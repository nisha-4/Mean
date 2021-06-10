import {React,useState} from 'react';
import { Route,Redirect,useHistory} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
 
  let history = useHistory()

  var hours = 0.0833333; 
  var now = new Date().getTime();
  var token = localStorage.getItem('token');
  // if (token == null) {
  //     localStorage.setItem('token', now)
  //     return <Component {...rest} {...props} />
  // } else {
  //     if(now-token > hours*60*60*1000) {
  //         localStorage.clear()
  //         localStorage.setItem('token', now);
  //         history.push("/")
  //     }
  // }
  
return (
    <Route {...rest} 
    render={props =>{
      if (localStorage.getItem("token") !== null) {
        return <Component {...rest} {...props} />
      }else{
        history.push("/")
      }
    }
      
        
    } />
    
   
    
  )
}

export default ProtectedRoute;
