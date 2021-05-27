import React,{useState} from 'react';
import {  NavLink, useHistory} from "react-router-dom";
import '../index.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LockIcon from '@material-ui/icons/Lock';
const Signup = () => {
    const history = useHistory()
    const [user,setuser]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        address:""
    })
    const handleInput = (event) =>{
        const { name, value } = event.target;
    setuser(prevState => ({
      ...prevState,
      [name]: value
    }));
    }

    const PostData = async (e) =>{
        e.preventDefault();
        
        const {name,email,password,cpassword,address} = user;

        const res = await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                name,email,password,cpassword,address

            })
        })
        const data = await res.json();
        
        if(data.status === 422 || data.error){
            window.alert(data.error);
            console.log(data.error);
        }
        else{
            window.alert("Registeration Successful ");
            console.log("Registeration Successful");

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
                            <input class="form-control" type="text" name="name" value={user.name} onChange={handleInput} placeholder="Enter username"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><EmailIcon/></label>
                            <input class="form-control" type="email" name="email" value={user.email} onChange={handleInput} placeholder="Enter email"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><LockIcon/></label>
                            <input class="form-control" type="password" name="password" value={user.password} onChange={handleInput} placeholder="Password"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><LockIcon/></label>
                            <input class="form-control" type="password" name="cpassword" value={user.cpassword} onChange={handleInput} placeholder="Confirm Password"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><LocationOnIcon/></label>
                            <textarea class="form-control" rows={3} placeholder="Enter address" value={user.address} onChange={handleInput} name="address" />
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
