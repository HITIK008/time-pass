const express = require("express");
const path = require("path");
const hbs =require("hbs");
require("./db/conn");
const User=require("./models/usermsg"); 
const user=require("./models/regdata");


const app = express();
const port = process.env.PORT || 3005;

//setting the path
 const staticpath=path.join(__dirname,"../public");
 const templatepath=path.join(__dirname,"../templates/views");
 const partialpath=path.join(__dirname,"../templates/partials");
//console.log(path.join(__dirname,"../public"));

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquey/dist")));
//for public static path
app.use(express.static(staticpath));
//to show your data user submitted
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));
//start hbs
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);


//app.get(path,callback)
app.get("/",(req,res)=>{
    res.render("index");
}); 

app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.get("/reg",(req,res)=>{
    res.render("reg");
})


app.get("/login",(req,res)=>{
    res.render("login");
})


app.post("/login",async(req,res)=>{
    try{
        const username =req.body.username;
        const password =req.body.password;
        const use=await user.findOne({username:username});
        console.log(use.password);
        console.log(password)
        if(use.password===password){
            res.status(201).render("index");

        }else{
            res.send("Password are not correct");
        }
    }catch(error){
        res.status(400).send("Something went wrong");
    }
})
 
app.post("/reg",async(req,res)=>{
    try{
        const regdata = new user(req.body);
        const regdata1=await regdata.save();
        res.status(303).render("index");
        console.log(regdata1);

    }
    catch(error){
        res.status(501).send(error);
    }
});


app.post("/contact",async(req,res)=>{
    try{
        // res.send(req.body)
        const userdata = new User(req.body);
        //save in database
        await userdata.save();
        res.status(201).render("index");
    }
    catch(error){
        res.status(500).send(error);
        }
})

app.listen(port,()=>{  
    console.log(`server is running  ${port}`);
});