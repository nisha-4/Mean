
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin = require("../models/AdminModel");




const AuthAdmin = async (req, res, next) => {

  let accessToken ;
  // console.log(req.headers)
  if(req.headers.authorization){
     accessToken= req.headers.authorization.split(" ")[1]  
  }  
  //if there is no token stored in cookies, the request is unauthorized
  if (!accessToken){
      return res.status(401).json({
        message:"Access Denied",
        data:[]
      })
  }
  let payload
  try{
      //use the jwt.verify method to verify the access token
      //throws an error if the token has expired or has a invalid signature
      payload = await  jwt.verify(accessToken,process.env.JWT_SECRET)
      // console.log(payload)
      const AdminExists = await Admin.findById(payload._id);
      // console.log(AdminExists)
       if (!AdminExists) {
        return res.status(401).json({
            message:"Admin is Unauthorized",
            data:[]
          })       
        return;
      }
      else{
        req.admin = {
            _id:AdminExists._id,
          }   ;
        next()
      }

  }
  catch(e){
      console.log(e)
      //if an error occured return request unauthorized error
      return res.status(401).json({
        message:"Admin is Unauthorized",
        data:[]
      })
  }
}
module.exports = AuthAdmin;