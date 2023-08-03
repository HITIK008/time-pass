const mongoose = require("mongoose");
//creating and conection of database
mongoose.connect("mongodb://localhost:27017/hitik")
.then(()=>{
    console.log(`Sucessfully connect..`);
}).catch((error)=>{
    console.log(error);
})