import {React,useState} from 'react'
import { Switch,Route,Redirect} from 'react-router';
import Login from "./Login"
import Home from "./Home"
import ProtectedRoute from "./ProtectedRoute"
function App() {

 
  return (
   <Switch>
     <Route exact path="/" component={Login}></Route>
     <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute> 
  </Switch>
  );
}

export default App;
