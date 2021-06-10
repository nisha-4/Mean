const mongoose = require('mongoose')
const validator = require('mongoose-validator')
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required:true
    },
    phone:{
        type:Number,
        minlength: 8,
        maxlength: 16,
        required:true
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        validate: [
        validator({
          validator: 'isEmail',
          message: 'Oops..please enter valid email'
        })
      ],
      required: true
    },
    address:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("User",UserSchema);