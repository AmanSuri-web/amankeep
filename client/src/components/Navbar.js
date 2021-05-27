import React ,{useContext, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css'
import {UserContext} from '../App'

const Navbar = () => {
  const {state,dispatch} = useContext(UserContext);
  useEffect(() => {
    
    
  }, [state]);
console.log(state)
  const RenderMenu = () => {
    if(state){
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
