const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const {OAuth2Client}=require('google-auth-library');
const client = new OAuth2Client("12622348913-teiih4gci150mr2k94rpfu9lordsot6o.apps.googleusercontent.com")
require('../db/conn');
const User = require('../model/userSchema');
const cloudinary = require('cloudinary')
const { response } = require('express');
const multer = require('multer');
const  sgMail  = require('@sendgrid/mail');

cloudinary.config({
    cloud_name:	process.env.CLOUD_NAME,
    api_key:	 process.env.API_KEY,
    api_secret:  process.env.API_SECRET

})
const {v4 : uuidv4} = require('uuid')
sgMail.setApiKey(process.env.SENDGRID_KEY);



const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './db');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });



router.post('/upload',upload.single('file'),async(req,res)=>{
    
    const email = req.body.email;
    console.log(email)
    const image = req.file.filename;
    console.log(req.file)
    
    try{
       
        await User.updateOne(
            {"email":email},
            {$set : {"picture":image}}
        )
        console.log('Updated Successfuly')
        res.send({message:'Updated Successfuly'});
   
  

}catch(err){
    console.log(err);
}
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

    const {fname,lname,name,email,password,cpassword} = req.body;
    
    if( !fname|| !lname|| !name|| !email||  !password|| !cpassword ){
        return res.status(422).json({error:'fill the complete form'});
    }
    if(password!=cpassword){
        return res.status(422).json({error:'password incorrect'});
    }
    
    if( !(name.match(/^[a-zA-Z0-9 ._]+$/i))){
        return res.status(422).json({error:'Use alpha-numerics, "." , "_" for username'});
    }
   
    
    if(name.match(".")){
        var indices = [];
        for(var i=0;i<name.length;i++){
            if (name[i] === ".") indices.push(i);
        }
        
        if(indices[0]==0||indices[indices.length-1]==name.length-1||indices[0]==name.length-1){
          return res.status(422).json({error:'. cannot be used at first or last place'});
        }
    }
    
    if(name.length<3){
        return res.status(422).json({error:'usename should have atleast 3 characters'});
    } else if(name.length>30){
        return res.status(422).json({error:'usename should have almost 30 characters'});
    } else {
        var alphabets = [];
        for(var i=0;i<name.length;i++){
            if (name[i].match(/^[a-zA-Z]+$/i)) alphabets.push(i);
        }
        
        if(alphabets.length==0){
            return res.status(422).json({error:'usename should have atleast 1 alphabet'});
        }
    }
    
    if(name.indexOf("..")>=0){
        return res.status(422).json({error:'. cannot be used in a row'});
    }
    
    if(fname.length<3){
        return res.status(422).json({error:'Firstname should have atleast 3 characters'});
    } 
    var uname=name.toLowerCase();
    const userExist = await User.findOne({email:email});
                
    if(userExist){
        return res.status(422).json({error:'Email already exist'});
    }
    const usernameExist = await User.findOne({name:uname});
         
    if(usernameExist){
        return res.status(422).json({error:'Username already exist , Use a different username'});
    }
    // generate token and save
    const token = jwt.sign({fname,lname,uname,email,password},process.env.SECRET_KEY,{expiresIn: '20m'});

        // Send email (use credintials of SendGrid)
        const msg = { from: {name:'MERN login',email:process.env.SENDGRID_EMAIL},
               to: email,
               subject: 'Account Verification Link',
               
               html: `
                        'Hello ${fname} <br>Please verify your account by clicking the link: <br>https:/\/\amanregister.herokuapp.com/#/authentication/activate/${token}<br> Thank You!',
                        `
            }
        sgMail
            .send(msg)
            .then((response) => {
                console.log('Email sent')
                return res.status(200).json({msg:'A verification email has been sent to ' + email + '. It will be expire after 20 minutes.'});
            })
            .catch((error) => {
                console.error(error)
            })
    
     
    
    
    
    
});

router.post('/email-activate',async(req,res)=>{
    const {token} = req.body;
    if(token){
        jwt.verify(token,process.env.SECRET_KEY, async(err,decodedToken)=>{
            if(err){
                return res.status(400).json({error:'Incorrect or expired link'});
            }
            const {fname,lname,uname,email,password} = decodedToken;

         
             const user = new User({fname,lname,name:uname,email,password,picture:""});
             
             const x=  await user.save();
             return res.status(200).json({message:'Registeration Successful'});
        })
    } else{
        return res.status(400).json({error:'Something went wrong...'});
    }
})

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
                expires:new Date(Date.now()+ 3000000),
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
        fname:req.rootUser.fname,
        lname:req.rootUser.lname,
        name:req.rootUser.name,
        email:req.rootUser.email,
        picture:req.rootUser.picture,
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

router.post('/googlelogin',async(req,res)=>{
    const {tokenId}=req.body;
    
    try{
    client.verifyIdToken({idToken:tokenId,audience:"12622348913-teiih4gci150mr2k94rpfu9lordsot6o.apps.googleusercontent.com"})
    .then(async(response)=>{
        
        const {email_verified,name,email}=response.payload;
        let space=name.indexOf(" ")
        var fname=name.slice(0,space);
        var lname=name.slice(space+1,name.length);
        
        if(email_verified){
            const userLogin = await User.findOne({email:email});
            
            if(userLogin){
                let token = await userLogin.generateAuthToken();
                

                res.cookie("jwtoken", token,{
                    expires:new Date(Date.now()+ 3000000),
                    httpOnly:true
                });
                console.log(token);
                return res.send({message:"Google Login Successful"})
                
            }
            else{
                let password = email+process.env.SECRET_KEY;
                const newId = uuidv4()
                const uname = fname + '_' + lname + newId;
                var str=uname.toLowerCase();
                
                const newUser = new User({fname,lname,name:str,email,password,picture:""});
                const x=  await newUser.save();
                let token = await newUser.generateAuthToken();
                

                res.cookie("jwtoken", token,{
                    expires:new Date(Date.now()+ 3000000),
                    httpOnly:true
                });
                console.log(token);
                return res.send({message:"Google Login Successful"})
                
            }
            
        }
    
    })
        
    }catch(err){
        console.log(err);
    }
});
module.exports = router;