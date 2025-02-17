import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from 
"react-router-dom";

import { useAuth } from "../context/ContextProvider";

const Navbar = ({setQuery}) => {
    const {user, logout} =  useAuth()
  return (
    <nav className="navbar">
      <div className="navbar-logo">NoteApp</div>
      <input
        type="text"
        placeholder="Search notes..."
        className="navbar-search"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="navbar-buttons">
        
          
          {!user ? (
            <>
              <NavLink to="/login" className="navbar-button login-btn">Login</NavLink>
        
        <NavLink to="/register" className="navbar-button signup-btn">Signup</NavLink>
            </>
          )
          :
          <>
           <span className="username">{user.name}</span>

          <button className="navbar-button logout-btn" onClick={logout}>Logout</button>
          </>
        
      }
        
      </div>
    </nav>
  );
};

export default Navbar;
