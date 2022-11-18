const mongoose =require('mongoose');


mongoose.connect("mongodb://localhost:27017/psingh_1604",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("successfully connect ...."))
.catch((err)=>console.log(err));