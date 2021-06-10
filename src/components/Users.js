import React,{useState,useEffect} from 'react'
import "./Users.css"


const Users = ({name, email, phone, address}) => {

useEffect(()=>{
  
},[])
    return (
        <div className="user">
                <div className="single-user">
                <h2>{name}</h2>
                <h2>{email}</h2>
                <h2>{phone}</h2>
                <h2>{address}</h2>
               </div>
            
        </div>
    )
}

export default Users
