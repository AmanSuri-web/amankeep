const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');
router.get("/",(req,res)=>{
    res.send(`Hello world from server`);
});

//using promises
// router.post('/register',(req,res)=>{

//     const {name,email,phone,work,password,cpassword} = req.body;

//     if( !name|| !email|| !phone||  !work|| !password|| !cpassword ){
//         return res.status(422).json({error:'fill the complete form'});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:'Email already exist'});
//         }
//         const user = new User({name,email,phone,work,password,cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message:'registration Successful '});
//         }).catch((err)=>res.status(500).json({error:'failed to register'}));
//     }).catch(err=>{console.log(err);});
    
// });

//using async
router.post('/register',async(req,res)=>{

    const {name,email,password,cpassword,address} = req.body;
    
    if( !name|| !email||  !password|| !cpassword || !address){
        return res.status(422).json({error:'fill the complete form'});
    }
    if(password!=cpassword){
        return res.status(422).json({error:'password incorrect'});
    }
    try{
       const userExist = await User.findOne({email:email});

       if(userExist){
        return res.status(422).json({error:'Email already exist'});
    }

    const user = new User({name,email,password,address});
    
    const x=  await user.save();
    
     res.status(201).json({message:'registration Successful '});
    
    
    }catch(err){
        console.log(err);
    }
    
});

//login route
router.post('/signin',async(req,res)=>{

    try{
        let token;
        const {email,password,} = req.body;

        if( !email|| !password){
            return res.status(422).json({error:'fill the complete form'});
        }

       const userLogin = await User.findOne({email:email});

        

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token,{
                expires:new Date(Date.now()+ 300000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error: "Invalid Credentials"});
            }
            else{
                res.json({message: "signin Successful"});
            }

        } else{
            res.status(400).json({error: "Invalid Credentials"});
        }
        
    }catch(err){
        console.log(err);
    }
    
});

//getting user details 
router.get("/about",authenticate,(req,res)=>{
    const data = {
        name:req.rootUser.name,
        email:req.rootUser.email,
        address:req.rootUser.address,
    }
    
    return res.json(data);
});


router.get("/logout",(req,res)=>{
    
    console.log('logout page')
    res.clearCookie('jwtoken',{path:'/'});
    return res.status(200).send("user logout");
});


//edit user details
router.post('/edit',async(req,res)=>{

    const {name,email,address} = req.body;
    
    console.log(req.body)
    
    try{
       
            await User.updateOne(
                {"email":email},
                {$set : {"name":name,"address":address}}
            )
            
            res.send({message:'Updated Successfuly'});
       
      
    
    }catch(err){
        console.log(err);
    }
    
});
module.exports = router;