import React,{useState} from 'react';
import {  NavLink, useHistory} from "react-router-dom";
import '../index.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Checkbox from '@material-ui/core/Checkbox';
const Signup = () => {
    const history = useHistory()
    const [user,setuser]=useState({
        fname:"",
        lname:"",
        name:"",
        email:"",
        password:"",
        cpassword:""
        
    })
    const handleInput = (event) =>{
        const { name, value } = event.target;
    setuser(prevState => ({
      ...prevState,
      [name]: value
    }));
    }
    const [pcheck1,setpcheck1]=useState(false);
    const [pcheck2,setpcheck2]=useState(false);
    const PostData = async (e) =>{
        e.preventDefault();
        
        const {fname,lname,name,email,password,cpassword} = user;

        const res = await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                fname,lname,name,email,password,cpassword

            })
        })
        const data = await res.json();
        
        if(data.status === 500 || data.error){
            window.alert(data.error);
            console.log(data.error);
        }
        else{
            window.alert(data.msg);
            console.log(data.msg);

            history.push("/")
        }
    }
    return (
        <div className="login-dark">
                    <form method="POST" onSubmit={PostData}>
                        <h2 className="sr-only">Sign up </h2>
                        <div className="illustration">
                            <i class="icon ion-ios-locked-outline"></i>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><AccountCircleIcon/></label>
                            <input class="form-control" type="text" name="fname" value={user.fname} onChange={handleInput} placeholder="Enter Firstname"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><AccountCircleIcon/></label>
                            <input class="form-control" type="text" name="lname" value={user.lname} onChange={handleInput} placeholder="Enter Lastname"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><AccountCircleIcon/></label>
                            <input class="form-control" type="text" name="name" value={user.name} onChange={handleInput} placeholder="Enter username"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><EmailIcon/></label>
                            <input class="form-control" type="email" name="email" value={user.email} onChange={handleInput} placeholder="Enter email"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><LockIcon/></label>
                            <input class="form-control" type={pcheck1?"text":"password"} name="password" value={user.password} onChange={handleInput} placeholder="Password"/>
                            <Checkbox
                                
                                onClick={() => setpcheck1(!pcheck1)}
                                labelStyle={{color: 'white'}}
                                iconStyle={{fill: 'white'}}
                                style ={{
                                    color: "white",
                                  }}
                            />
                             <p style={{position:'absolute',left:'87%',marginTop:'12px',fontSize:'10px'}}>show</p>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><LockIcon/></label>
                            <input class="form-control" type={pcheck2?"text":"password"} name="cpassword" value={user.cpassword} onChange={handleInput} placeholder="Confirm Password"/>
                            <Checkbox
                                
                                onClick={() => setpcheck2(!pcheck2)}
                                labelStyle={{color: 'white'}}
                                iconStyle={{fill: 'white'}}
                                style ={{
                                    color: "white",
                                  }}
                            />
                            <p style={{position:'absolute',left:'87%',marginTop:'12px',fontSize:'10px'}}>show</p>
                        </div>
                        
                        <button className="btn btn-outline-primary " style={{width:'100%',marginTop:'10px'}} type="submit" >Signup</button>
                        <div  style={{display:'flex',textAlign:'center',marginTop:'20px'}}>
                            <p>Already have an account? </p><NavLink style={{marginLeft:'10px'}} className="navlink"  to="/">Login</NavLink>
                        </div>
                    </form>
                </div>
    );
    
}

export default Signup;
