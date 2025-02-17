import React,{useState} from 'react';
import './Signup.css';
import axios from 'axios'

import { NavLink, useNavigate } from "react-router-dom";


const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/api/auth/register',{name,email,password})
            console.log(response)
            if(response.data.success){
              navigate('/login')
            }
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className="signup-container-profile-view">
      <div className="signup-box-profile-view">
        <h2 className="signup-title-profile-view">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group-profile-view">
            <label htmlFor="name" className="label-profile-view">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Username"
              className="input-profile-view"
              required
            />
          </div>

          <div className="form-group-profile-view">
            <label htmlFor="email" className="label-profile-view">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input-profile-view"
              required
            />
          </div>

          <div className="form-group-profile-view">
            <label htmlFor="password" className="label-profile-view">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="input-profile-view"
              required
            />
          </div>

          <button type="submit" className="signup-button-profile-view">
            Signup
          </button>
        </form>

        <p className="login-link-profile-view">
          Already Have Account? <NavLink to="/login" className="link-profile-view">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
