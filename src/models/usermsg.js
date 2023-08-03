const mongoose=require("mongoose");
const validator =require("validator");

const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    phone:{
        type:Number,
        min:10,
        required:true
    },
    email:{
        required:true,
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid");
            }
        }
    },
    // time:{
    //     required:true
    // },
password:{
    type:String,
    required:true,
    minLength:4
},
    

});

const User = mongoose.model("User",userSchema);

module.exports= User;