import React,{useContext, useState} from 'react';
import { NavLink ,useHistory} from "react-router-dom";
import '../index.css'

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import {UserContext} from '../App'

const Login=()=>{

    const {state,dispatch} = useContext(UserContext);

    const history = useHistory();
    const [email,setemail]=useState('');
    const [password,setPassword]=useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch("/signin", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                email,password

            })
        });
        const data = await res.json();

        if(data.status === 400 || data.error){
            window.alert(data.error);
            console.log(data.error);
        }
        else{
            dispatch({type:"USER",payload:true})
            window.alert("Login Successful ");
            console.log("Login Successful");

            history.push("/about");
        }
    }
        return (<>
                  
                
                <div className="login-dark1">
                    <form method="POST" onSubmit={loginUser}>
                        <h2 className="sr-only">Login </h2>
                        <div className="illustration">
                            <i class="icon ion-ios-locked-outline"></i>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><EmailIcon/></label>
                            <input class="form-control" type="email" name="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="Enter email"/>
                        </div>
                        <div className="form-group" style={{display:'flex'}}>
                            <label><LockIcon/></label>
                            <input class="form-control" type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password"/>
                        </div>
                        <button className="btn btn-outline-primary " style={{width:'100%',marginTop:'10px'}} type="submit" >Login</button>
                        <div  style={{display:'flex',textAlign:'center',marginTop:'20px'}}>
                            <p>Don't have an account? </p><NavLink style={{marginLeft:'10px'}} className="navlink"  to="/signup">Sign Up</NavLink>
                        </div>
                    </form>
                </div>
                
		</>);
}
export default Login;