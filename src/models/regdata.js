const mongoose=require("mongoose");
const validator =require("validator");

const regdata =mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    username:{
        type:String,
        min:10
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
phone:{
    type:Number,
    min:10
},
password:{
    type:String,
    min:3
}   

});

const user = mongoose.model("user1",regdata);

module.exports= user;