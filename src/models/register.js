const mongoose =require('mongoose');

const createSchema=new mongoose.Schema({
      name: {
      type: String, required: true
      },
      email:{
        type: String,
        required: true,
        unique: true,
      },

      password:{
        type : String,
        required: true,

      } ,
      contact: {
        type: String, required: true
      },
      Department: {
        type: String, required: true
      },
       DateOfJoin: {
        type: Date, required: true
      },
      isAdmin: {
        type: Boolean, default: false
      }


})

const Register=new mongoose.model("Register",createSchema);
module.exports=Register