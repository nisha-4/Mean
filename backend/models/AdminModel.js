const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    }
});
adminSchema.pre("save", async function (next) {
    if (this.isNew) {
      this.password = await bcrypt.hash(this.password.toString(), 10);
    }
    next();
  });
  
  adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  


module.exports = mongoose.model("Admin",adminSchema);