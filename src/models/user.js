const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50
  },
  lastName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50
  },
  emailId:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)) {
        throw new Error("Email is not valid: " + value);
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    validate(value){
      if(!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid")
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://images.app.goo.gl/G1v1mGLxRb2KsM3b8",
    validate(value){
      if(!validator.isURL(value)) {
        throw new Error("Url is not valid: " + value);
      }
    }
  },
  about:{
    type:String,
    default:"This is a default about of the User!"
  },
  skills:{
    type:[String]
  }
},{timestamps:true});

// const User = mongoose.model("User", userSchema);
// module.exports = User;

// -------------- OOOOOOOORRRRRRRRR-------------

module.exports = mongoose.model("User", userSchema);