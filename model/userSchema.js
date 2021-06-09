const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required:false
    },
    lname:{
        type: String,
        required:false
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    
    password:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:false
    },
    picture:{
        type: String,
    },
    firstDate:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
    
})



//hashing the password

userSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});

//generating token

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);//generate token
        this.tokens = this.tokens.concat({token:token});//add token to userSchema
        await this.save();
        return token;

    } catch (err){
        console.log(err)
    }
}
const User = mongoose.model('USER',userSchema);

module.exports = User;