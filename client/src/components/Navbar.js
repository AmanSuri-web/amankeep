import React ,{useContext, useEffect,useState} from 'react';
import { NavLink ,useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css'
import {UserContext} from '../App'

const Navbar = () => {
  const history=useHistory();
  
 const getCookie = ()=>{
  var dc = document.cookie;
    var prefix = "jwtoken" + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    
    return decodeURI(dc.substring(begin + prefix.length, end));
 }
 const [ myCookie,setMyCookie]= useState(getCookie());
  useEffect(() => {
    
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    
  
  return history.listen((location) => { 
    console.log(`You changed the page to: ${location.pathname}`) 
    
    console.log(getCookie())
    setMyCookie(getCookie())
    
 }) 
},[history]);
  const {state,dispatch} = useContext(UserContext);
  
  console.log(myCookie)
  console.log(document.cookie)
  
  
console.log(state)
  const RenderMenu = () => {
    if(myCookie){
      return(
        <>
            <li className="nav-item ">
        <NavLink activeClassName="menu_active" className="nav-link" to="/about">About me </NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink  activeClassName="menu_active" className="nav-link" to="/logout">Logout</NavLink>
      </li>
        </>
      )
    } else{
      return(
        <>
          <li className="nav-item ">
        <NavLink activeClassName="menu_active" className="nav-link" to="/about">About me </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact activeClassName="menu_active" className="nav-link" to="/">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink  activeClassName="menu_active" className="nav-link" to="/signup">Registeration</NavLink>
      </li>
      
        </>
      )
    }
  }

    return (
         <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand " to="/" style={{marginLeft:'10px'}}>AmanLogin</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto" >
    
    <RenderMenu/>

      
      
    </ul>
    
  </div>
</nav>
        </>
    );
    
}

export default Navbar;
